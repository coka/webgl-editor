Polymer
({
  is: "editor-attribute-view",

  properties:
  {
    translateX: { type: Number, notify: true },
    translateY: { type: Number, notify: true },
    translateZ: { type: Number, notify: true },
    rotateX:    { type: Number, notify: true },
    rotateY:    { type: Number, notify: true },
    rotateZ:    { type: Number, notify: true },
    scaleX:     { type: Number, notify: true },
    scaleY:     { type: Number, notify: true },
    scaleZ:     { type: Number, notify: true },
    animationStatus: { type: Boolean, notify: true }
  }
});
