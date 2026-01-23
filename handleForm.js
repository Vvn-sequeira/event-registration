const form = document.getElementById("customForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // stop Netlify / default submit
  console.log("submit triggered ")
  // Collect all form data including file
  const formData = new FormData(form);
  
    for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }
  try {
    // const response = await fetch("http://localhost:8080/register", {
    //   method: "POST",
    //   body: formData,  
    // });
    const response = await fetch("https://event-registration-1-g5y3.onrender.com/register", {
      method: "POST",
      body: formData,   
    });

    const result = await response.json();

    if (response.ok) {
      alert("Registration Successful ✅");
      console.log("Saved Data:", result);

      // Optional: reset form
      form.reset();
    } else {
      alert("Registration Failed ❌");
      console.log("Error:", result);
    }

  } catch (error) {
    console.error("Server Error:", error);
    alert("Server not responding ❌");
  }
});
