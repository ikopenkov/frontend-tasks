# Prototypal Inheritance

## Task

Given is a JSON response:
```json
[{
	"id": "51F361A4-08A4-4113-8045-9B09F84572FF",
	"name": "facebook",
	"text": "Facebook Lorem Ipsum Dolor",
	"likes": 91
}, {
	"id": "8994458D-28E0-4925-82B3-83E9BB05906D",
	"name": "google",
	"text": "Google+ Lorem Ipsum Dolor",
	"plus": 101
}, {
	"id": "6EA36600-D130-472A-87C8-124EB27B4BD2",
	"name": "instagram",
	"image": {
		"caption": "new picture",
		"url": "//new-picture.jpg"
	}
}]
```

- Given are social networks
- Every network has an ID: `String` and a name: `String`
- Facebook and Google+ have a text: `String`
- Facebook has likes: `Number`
- Google+ has Plus: `Number`
- Instagram has an image: `Object` (The Image has a figcaption:
`String` and an URL: `String`)

Task: Create a useful prototypal inheritance through this example and give a short description.
