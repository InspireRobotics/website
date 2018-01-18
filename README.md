
# INSPIRE Robotics/Missing Parts Website

The Inspire Robotics Website

## Directories

### Pictures
This holds all of the pictures on the website.
Below is a table of all the important files/directories:

| Directory    | Description   |
|:-------------:|:-------------:|
|**first**| photos by FIRST (game logos, the first logo, etc)|
|**social media**|logos for social media (Facebook, Instagram, etc.)|
|**team logos**|logos for Missing Parts and INSPIRE Robotics|
|**team pictures/cannonbot**| pictures of the cannon robot|
|**team pictures/outreach**|pictures of outreach|
|**team pictures/pictures.txt**|List of pictures for the Gallery. See "Photo Gallery"|

### JS

This holds all of the java script used for the website. Below is a table of all the files:

| Path    | Description   |
|:-------------:|:-------------:|
|**js/pictures.s**|All of the code for the picture gallery. See "Photo Gallery"|

## Photo Gallery
The Gallery for the website is actually controlled with javascript and a text file so that the HTML file can be somewhat small.

### How it Works
When the user opens the webpage the javascript will retrieve the pictures.txt file in the pictures folder. It will then parse the file for all of the images to be used. 

### How to add Pictures
To add a picture simply add a line to the bottom of the pictures.txt file. It uses the format
```
[Caption]=[location]
```
So if you had a picture of a big car at cars.com/big.png
simply add the following line to the end of the file:
```
A Big Car=cars.com/big.png
```

You can also add comments by **starting a line** with "//". For example:
```
// Cars
A Big Car=cars.com/big.png
```
would only add one picture to the gallery.

### Please Note
Please note that the picture gallery will not work on chrome when using file://. To get around this you can host a local server by calling
```
python -m SimpleHTTPServer 8001
```
and then opening
```
http://localhost:4283/Pictures.html
```
The reason for this is the gallery makes an HTTP Request to grab the pictures and chrome won't let file:// AJAX. 