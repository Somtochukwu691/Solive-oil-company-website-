// Solive Oil — shared site behavior

document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Contact form validation (client-side only — wire up a backend/email
  // service such as Formspree, EmailJS, or a serverless function to actually
  // deliver messages)
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;

      var fields = [
        { id: "name", check: function (v) { return v.trim().length > 1; } },
        { id: "email", check: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); } },
        { id: "message", check: function (v) { return v.trim().length > 5; } }
      ];

      fields.forEach(function (f) {
        var input = document.getElementById(f.id);
        var wrapper = input.closest(".form-field");
        if (!f.check(input.value)) {
          wrapper.classList.add("invalid");
          valid = false;
        } else {
          wrapper.classList.remove("invalid");
        }
      });

      var success = document.getElementById("form-success");
      if (valid) {
        form.reset();
        success.classList.add("show");
        success.setAttribute("role", "status");
        setTimeout(function () { success.classList.remove("show"); }, 6000);
      } else if (success) {
        success.classList.remove("show");
      }
    });
  }
});
