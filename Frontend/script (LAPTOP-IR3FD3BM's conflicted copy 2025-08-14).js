document.addEventListener("DOMContentLoaded", () => {
const form = document.getElementById("form");

function showError(id, message) {
      const input = document.getElementById(id);
      const error = document.getElementById(id + "Error");
      if (input) input.classList.add("invalid");
      if (error) error.textContent = message;
    }

     function clearErrors() {
      document.querySelectorAll(".error").forEach(e => e.textContent = "");
      document.querySelectorAll(".invalid").forEach(e => e.classList.remove("invalid"));
    }


form.addEventListener("submit", function (e) {
  e.preventDefault();

   clearErrors();

      

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = document.getElementById("age").value.trim();
  const role = document.getElementById("role").value;
  const comment = document.getElementById("comment").value;

  const recommend = document.querySelector('input[name="recommend"]:checked')?.value || "";
  const languages = Array.from(document.querySelectorAll('input[name="languages"]:checked'))
                         .map(checkbox => checkbox.value);

                          

  // Validation
  const nameRegex = /^[A-Za-z\s]{2,30}$/;
  if (!nameRegex.test(name)) {
  alert("Please enter a valid name (letters only, min 2 characters).");
  return;
}

  if (!email.includes("@") || !email.includes(".")) {
    alert("Please enter a valid email.");
    return;
  }

  if (isNaN(age) || age < 10 || age > 100) {
    alert("Please enter a valid age between 10 and 100.");
    return;
  }
  if (!recommend) {
      alert("Please select an option for recommendation.");
      return;
  }

  if (languages.length === 0) {
      alert("Please select at least one language.");
      return;
    }

     

  // Send to server
  fetch("http://localhost:3000/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      age,
      role,
      recommend,
      languages,
      comment,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message || "Form submitted successfully!");
      form.reset(); // Optional: Reset form after submission
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    });
});
});
