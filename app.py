from flask import Flask, render_template, request, redirect, url_for
from datetime import datetime, timedelta

app = Flask(__name__)

# Sample product data for the shop
products = [
    {"id": 1, "name": "Wireless Gaming Mouse", "price": 49.99, "category": "mice", "image": "mouse.jpg"},
    {"id": 2, "name": "Mechanical Keyboard", "price": 79.99, "category": "keyboards", "image": "keyboard.jpg"},
    {"id": 3, "name": "1TB SSD", "price": 89.99, "category": "storage", "image": "ssd.jpg"},
    {"id": 4, "name": "Laptop Cooling Pad", "price": 29.99, "category": "accessories", "image": "cooler.jpg"},
    {"id": 5, "name": "USB-C Hub", "price": 39.99, "category": "accessories", "image": "hub.jpg"},
    {"id": 6, "name": "Wireless Headphones", "price": 59.99, "category": "accessories", "image": "headphones.jpg"},
]

# Sample services data
services = [
    {"id": 1, "name": "Computer Repairs", "icon": "fa-tools", "description": "Hardware and software repairs for desktops"},
    {"id": 2, "name": "Laptop Maintenance", "icon": "fa-laptop", "description": "Cleaning and optimization for laptops"},
    {"id": 3, "name": "Custom Builds", "icon": "fa-desktop", "description": "Custom PCs tailored to your needs"},
    {"id": 4, "name": "On-site Support", "icon": "fa-home", "description": "Tech support at your location"},
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/services')
def services():  # Changed from services_page to services
    return render_template('services.html', services=services)

@app.route('/shop')
def shop():
    category = request.args.get('category', 'all')
    if category == 'all':
        filtered_products = products
    else:
        filtered_products = [p for p in products if p['category'] == category]
    return render_template('shop.html', products=filtered_products, current_category=category)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # Process form data
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        # In a real app, you would save this to a database or send an email
        print(f"New contact form submission from {name} ({email}): {message}")
        return redirect(url_for('contact_success'))
    return render_template('contact.html')

@app.route('/contact/success')
def contact_success():
    return render_template('contact.html', success=True)

@app.route('/booking', methods=['GET', 'POST'])
def booking():
    if request.method == 'POST':
        # Process booking form
        service = request.form['service']
        date = request.form['date']
        time = request.form['time']
        name = request.form['name']
        contact = request.form['phone']
        # In a real app, you would save this to a database
        print(f"New booking: {name} for {service} on {date} at {time}")
        return redirect(url_for('booking_success'))
    
    # Generate available dates (next 14 days)
    today = datetime.now().date()
    available_dates = [today + timedelta(days=i) for i in range(1, 15)]
    return render_template('booking.html', available_dates=available_dates)

@app.route('/booking/success')
def booking_success():
    return render_template('booking.html', success=True)

if __name__ == '__main__':
    app.run(debug=True)