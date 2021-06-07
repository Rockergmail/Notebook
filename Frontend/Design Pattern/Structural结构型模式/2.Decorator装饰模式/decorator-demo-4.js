class Coffee{
    make(water){
      return `${water}+咖啡`;
    }
    cost(){
        return 10;
    }
  }
  
  class MilkCoffee{
      constructor(parent){
          this.parent = parent;
      }
      make(water){
          return `${this.parent.make(water)}+牛奶`;
      }
      cost(){
          return this.parent.cost()+1;
      }
  }
  
  class SugerCoffee{
      constructor(parent){
          this.parent = parent;
      }
      make(water){
          return `${this.parent.make(water)}+糖`;
      }
      cost(){
          return this.parent.cost()+2;
      }
  }
  let coffee = new Coffee();
  let milkCoffee = new MilkCoffee(coffee);
  let milksugerCoffee = new SugerCoffee(milkCoffee);
  console.log(milksugerCoffee.make('水')+'='+milksugerCoffee.cost());