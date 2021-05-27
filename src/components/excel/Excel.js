export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = document.createElement('div');
    $root.classList.add('excel');
    this.components.forEach((Component) => {
      const component = new Component($root);
      $root.insertAdjacentHTML('beforeend', component.toHTML());
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
  }
}
