/**
 * Base class
 */
function Post(attributes) {
    this.setId(attributes.id);
    this.setName(attributes.name);
}

Post.prototype.setId = function(id) {
    this._id = id;
};

Post.prototype.setName = function(name) {
    this._name = name;
};

/**
 * inheritance for FB & Google+
 */
function TextPost(attributes) {
    Post.apply(this, arguments);

    this.setText(attributes.text);
    this.setLikesNumber(attributes.likes || attributes.plus || 0);
}

// to make TextPost.prototype.__proto__ === Post.prototype
TextPost.prototype = Object.create(Post.prototype);

// constructor property lost after Object.create
TextPost.prototype.constructor = TextPost;

TextPost.prototype.setText = function(text) {
    this._text = text;
};

TextPost.prototype.setLikesNumber = function(number) {
    this._likesNumber = number;
};


/**
 * class for image data storage
 */
function Image(attributes) {
    this.setCaption(attributes.caption);
    this.setUrl(attributes.url);
}

Image.prototype.setCaption = function(caption) {
    this._caption = caption;
};

Image.prototype.setUrl = function(url) {
    this._url = url;
};

/**
 * inheritance for instagram
 */
function ImagePost(attributes) {
    Post.apply(this, arguments);

    this.setImage(attributes.image);
}

ImagePost.prototype = Object.create(Post.prototype);

ImagePost.prototype.constructor = ImagePost;

ImagePost.prototype.setImage = function(imageAttributes) {
    this._image = new Image(imageAttributes);
};

// factory
var postFactory = function(posts) {
    return posts.map(function(post) {
        if (post.image) {
            return new ImagePost(post);
        } else if (post.text) {
            return new TextPost(post);
        } else {
            return new Post(post);
        }
    });
}

// response
var RESPONSE = [
    {
        id: '51F361A4-08A4-4113-8045-9B09F84572FF',
        name: 'facebook',
        text: 'Facebook Lorem Ipsum Dolor',
        likes: 91,
    },
    {
        id: '8994458D-28E0-4925-82B3-83E9BB05906D',
        name: 'google',
        text: 'Google+ Lorem Ipsum Dolor',
        plus: 101,
    },
    {
        id: '6EA36600-D130-472A-87C8-124EB27B4BD2',
        name: 'instagram',
        image: {
            caption: 'new picture',
            url: '//new-picture.jpg',
        },
    },
];

var instances = postFactory(RESPONSE);
