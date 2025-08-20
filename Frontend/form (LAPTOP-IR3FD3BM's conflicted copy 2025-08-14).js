document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("myForm");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // prevent normal form submit

        const formData = {
            name: form.name.value,
            email: form.email.value,
            age: form.age.value,
            role: form.role.value,
            recommend: form.recommend.value,
            languages: Array.from(form.languages)
                .filter(lang => lang.checked)
                .map(lang => lang.value),
            comment: form.comment.value
        };

        // Optional: Basic validations
        if (!formData.recommend) {
            alert("Please select a recommendation option.");
            return;
        }
        if (formData.languages.length === 0) {
            alert("Please select at least one programming language.");
            return;
        }

        try {
            const response = await fetch("/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            alert(result.message);

            form.reset(); // Clear the form
        } catch (error) {
            console.error("❌ Error submitting form:", error);
            alert("Something went wrong. Try again!");
        }
    });
});
