from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message

app = Flask(__name__)

# Email Configurations
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = "vijay.tlab01@gmail.com"
app.config["MAIL_PASSWORD"] = "zrvu orqo aggj pngz"
app.config["MAIL_DEFAULT_SENDER"] = "vijay.tlab01@gmail.com"

mail = Mail(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/blogs")
def blogs():
    return render_template("blogs.html")

@app.route("/innovation")
def innovation():
    return render_template("innovation.html")

@app.route("/technology")
def technology():
    return render_template("technology.html")

@app.route("/send-email", methods=["POST"])
def send_email():
    try:
        data = request.json
        user_email = data["email"]
        user_message = data["message"]

        msg = Message(
            subject=f"New Contact Request from {user_email}",
            sender=("Contact Form", app.config["MAIL_USERNAME"]),
            recipients=["vijay.tlab01@gmail.com"],
            body=f"Message from {user_email}:\n\n{user_message}"
        )

        mail.send(msg)
        return jsonify({"message": "Email sent successfully!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=8000)
