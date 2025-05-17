
window.onload = function () {
    // Register
    const registerBtn = document.getElementById("registerBtn");
    if (registerBtn) {
      registerBtn.addEventListener("click", async () => {
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const msgBox = document.getElementById("responseMsg");
        try {
          const res = await fetch("http://localhost:8000/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
          });
          const data = await res.json();
    
          if (data.success) {
            msgBox.textContent = "Register Successfully!";
            msgBox.classList.add("text-green-600");
          } else {
            msgBox.textContent = `${data.message}`;
            msgBox.classList.add("text-red-600");
          }

        } catch (error) {
          msgBox.textContent = "Catch SignUp Block Something went wrong!";
          msgBox.classList.add("text-red-600");
        }
      })
  }
        
    // Login
    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", async () => {
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const msgBox = document.getElementById("responseMsg");
  
        try {
          const res = await fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ email, password }),
          });
          const data = await res.json();
          if (data.success) {
            msgBox.textContent = "Login Successfully!";
            msgBox.classList.add("text-green-600");
            loadDashboardData(); 
          } else {
            msgBox.textContent = `${data.message}`;
            msgBox.classList.add("text-red-600");
          }
        } catch (error) {
          msgBox.textContent = `Something Went Wrong`;
          msgBox.classList.add("text-red-600");
        }
      });
    }
   
    //Dashboard 
 const loadDashboardData = async () => {
    try {
    const res = await fetch("http://localhost:8000/api/products/dashboard", {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    if(data.success){
      window.location.href="dashboard.html"
    }
    console.log(data.data);
    const usernameBlock = document.getElementById("username");
    console.log(usernameBlock)
    usernameBlock.innerHTML = data.data.username;
    } catch (error) {
        console.log(error)
    }
}

  
    // Add Product
    const addBtn = document.getElementById("addBtn");
    if (addBtn) {
        addBtn.addEventListener("click", async () => {
        const name = document.getElementById("name").value.trim();
        const price = document.getElementById("price").value.trim();
        const category = document.getElementById("category").value.trim();
        const msgBox = document.getElementById("responseMsg");
  
        try {
          const res = await fetch("http://localhost:8000/api/products/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ name, price, category }),
          });
  
          const data = await res.json();
          if (data.success) {
            msgBox.textContent = "Product Added Successfully!";
            msgBox.classList.add("text-green-600");
          } else {
            msgBox.textContent = `${data.message}`;
            msgBox.classList.add("text-red-600");
          }
        } catch (error) {
          msgBox.textContent = `Something Went Wrong`;
          msgBox.classList.add("text-red-600");
        }
      });
    }
    
    //log out 
    const logoutBtn = document.getElementById("logoutBtn");
    if(logoutBtn){
        
      logoutBtn.addEventListener("click", async () => {
        const res = await fetch("http://localhost:8000/api/auth/logout",{
          method : "POST",
          credentials : "include"
        }) 

        const data = await res.json();
        if(data.success){
          window.location.href = "index.html"
        }
      })
  };
}