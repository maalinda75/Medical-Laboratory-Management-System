import React from "react";
import NavBar from "./NavBar";

function ContactUs() {

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <img
            src="https://img.freepik.com/free-photo/contact-us-communication-support-service-assistance-concept_53876-128103.jpg?size=626&ext=jpg&ga=GA1.1.280052515.1678786237&semt=ais"
            alt="Contact Us"
            className="img-fluid mb-3"
            style={{ height: "500px" }}
          />
        </div>
        <div className="row">
          <div className="col-md-4">
            <h2>CDL</h2>
            <p>123 Main Street</p>
            <p>Kandy,Sri Lanka</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@CDL.com</p>
          </div>
          <div className="col-md-4">
            <h2>Hours of Operation</h2>
            <p>Monday - Friday: 8am - 5pm</p>
            <p>Saturday: 8am - 12pm</p>
            <p>Sunday: Closed</p>
          </div>
          <div className="col-md-4">
            <h2>Send Us a Message</h2>
            <p>
              We welcome your questions, comments, and feedback. Please feel
              free to reach out to us using the contact information above.
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12">
            {/* Interactive Map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3739.3440887687477!2d-122.43129718510463!3d37.77397237424493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x6bb2f26d6f2a9ec2!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1623762395069!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Map"
            ></iframe>
          </div>
        </div>
      </div>
      <div>
        <footer
          className="py-3"
          style={{ backgroundColor: "#eef4ed", marginTop: "30px" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <p>CDL &copy; {new Date().getFullYear()}</p>
              </div>
              <div className="col-md-6 text-md-end">
                <p>123 Main Street, Sri Lanka</p>
                {/* Social Media Links */}
                <div>
                  <a href="#your-social-media-link"><i className="fab fa-facebook"></i></a>
                  <a href="#your-social-media-link"><i className="fab fa-twitter"></i></a>
                  <a href="#your-social-media-link"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default ContactUs;
