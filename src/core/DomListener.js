export class DomListener {
  constructor($root) {
    console.log($root);
    if (!$root) {
      throw new Error('No $root was provided');
    }
    this.$root = $root;
  }
}
