// https://github.com/tholman/90s-cursor-effects

(function bubblesCursor() {
  let width = window.innerWidth;
  let cursor = { x: width / 2, y: width / 2 };
  let bubbles = [];

  function init() {
    bindEvents();
    loop();
  }

  function bindEvents() {
    document.addEventListener("mousemove", onMouseMove);
  }

  /*  function onTouchMove(e) {
    if (e.touches.length > 0) {
      for (let i = 0; i < e.touches.length; i++) {
        addBubble(e.touches[i].clientX, e.touches[i].clientY);
      }
    }
  } */

  function onMouseMove(e) {
    cursor.x = e.clientX;
    cursor.y = e.clientY;

    addBubble(cursor.x, cursor.y);
  }

  function addBubble(x, y) {
    let bubble = new Bubble();
    bubble.init(x, y);
    bubbles.push(bubble);
  }

  function updateBubbles() {
    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].update();
    }

    for (let i = bubbles.length - 1; i >= 0; i--) {
      if (bubbles[i].lifeSpan < 0) {
        bubbles[i].die();
        bubbles.splice(i, 1);
      }
    }
  }

  function loop() {
    requestAnimationFrame(loop);
    updateBubbles();
  }

  function Bubble() {
    this.lifeSpan = 450;
    this.initialStyles = {
      position: "absolute",
      "z-index": "1000",
      width: "5px",
      height: "5px",
      background: "#bbb",
      "box-shadow": "-1px 0px #f2f5f7, 0px -1px #f2f5f7, 1px 0px #fafdff, 0px 1px #fafdff",
      "border-radius": "3px",
      overflow: "hidden",
    };

    this.init = function (x, y) {
      this.velocity = {
        x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 10),
        y: -0.4 + Math.random() * -1,
      };

      this.position = { x: x - 10, y: y - 10 };

      this.element = document.createElement("span");
      applyProperties(this.element, this.initialStyles);
      this.update();

      document.body.appendChild(this.element);
    };

    this.update = function () {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      this.velocity.x += ((Math.random() < 0.5 ? -1 : 1) * 2) / 95;
      this.velocity.y -= Math.random() / 400;
      this.lifeSpan--;

      this.element.style.transform =
        "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + (0.3 + (450 - this.lifeSpan) / 450) + ")";
    };

    this.die = function () {
      this.element.parentNode.removeChild(this.element);
    };
  }

  function applyProperties(target, properties) {
    for (let key in properties) {
      target.style[key] = properties[key];
    }
  }

  init();
})();
