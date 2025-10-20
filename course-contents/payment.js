const courses = {
  "graphic-design": {
    title: "Graphic/UI/UX Design",
    subtitle:
      "From fundamentals to brand identity hands-on projects to build your portfolio.",
    duration: "12 weeks",
    price: "₦350,000",
  },
  "social-media-management": {
    title: "Social Media Management",
    subtitle:   
      "Master the art of reaching and engaging audiences.",
    duration: "16 weeks",
    price: "₦300,000",
  },
  "web-development": {
    title: "Web Development",
    subtitle:"Master HTML, CSS, JavaScript and modern frameworks to build responsive websites.",
    duration: "20 weeks",
    price: "₦400,000",
  },
  "virtual-assistant": {
    title: "Virtual Assistant",
    subtitle:
      "Turn creativity into stories that inspire the world.",
    duration: "10 weeks",
    price: "₦300,000",
  },
  "video-editing": {
    title: "Video Editing",
    subtitle:
      "Master SEO, social media marketing, content strategy, and analytics.",
    duration: "8 weeks",
    price: "₦350,000",
  },
};

function updateCourse() {
  const select = document.getElementById("courseSelect");
  const selectedCourse = courses[select.value];

  document.getElementById("courseTitle").textContent = selectedCourse.title;
  document.getElementById("courseSubtitle").textContent =
    selectedCourse.subtitle;
  document.getElementById("courseDuration").textContent =
    selectedCourse.duration;
  document.getElementById("coursePrice").textContent = selectedCourse.price;
}

document
  .getElementById("enrollmentForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
      const courseName = document.getElementById("courseTitle").textContent;
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;

      alert(
        `Thank you ${firstName} ${lastName}! Your spot for ${courseName} has been reserved. We'll contact you shortly with next steps.`
      );

      // Reset form
      this.reset();
      clearValidation();
    }
  });

// Real-time validation
document.getElementById("firstName").addEventListener("blur", function () {
  validateField("firstName", validateName(this.value), "firstNameError");
});

document.getElementById("lastName").addEventListener("blur", function () {
  validateField("lastName", validateName(this.value), "lastNameError");
});

document.getElementById("email").addEventListener("blur", function () {
  validateField("email", validateEmail(this.value), "emailError");
});

document.getElementById("phone").addEventListener("blur", function () {
  validateField("phone", validatePhone(this.value), "phoneError");
});

document.getElementById("terms").addEventListener("change", function () {
  validateField("terms", this.checked, "termsError");
});

// Clear error on input
["firstName", "lastName", "email", "phone"].forEach((id) => {
  document.getElementById(id).addEventListener("input", function () {
    if (this.classList.contains("error")) {
      this.classList.remove("error");
      document.getElementById(id + "Error").classList.remove("show");
    }
  });
});

function validateForm() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const terms = document.getElementById("terms").checked;

  let isValid = true;

  if (!validateField("firstName", validateName(firstName), "firstNameError")) {
    isValid = false;
  }

  if (!validateField("lastName", validateName(lastName), "lastNameError")) {
    isValid = false;
  }

  if (!validateField("email", validateEmail(email), "emailError")) {
    isValid = false;
  }

  if (!validateField("phone", validatePhone(phone), "phoneError")) {
    isValid = false;
  }

  if (!validateField("terms", terms, "termsError")) {
    isValid = false;
  }

  return isValid;
}

function validateField(fieldId, isValid, errorId) {
  const field = document.getElementById(fieldId);
  const errorMsg = document.getElementById(errorId);

  if (isValid) {
    field.classList.remove("error");
    field.classList.add("success");
    errorMsg.classList.remove("show");
    return true;
  } else {
    field.classList.remove("success");
    field.classList.add("error");
    errorMsg.classList.add("show");
    return false;
  }
}

function validateName(name) {
  return name.trim().length >= 2;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex =
    /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
}

function clearValidation() {
  ["firstName", "lastName", "email", "phone", "terms"].forEach((id) => {
    const field = document.getElementById(id);
    field.classList.remove("error", "success");
    document.getElementById(id + "Error").classList.remove("show");
  });
}
