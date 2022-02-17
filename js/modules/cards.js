const cards = function() {
  //MENU CARDS
  class MenuCard {
    constructor(
      imgSrc,
      altimg,
      title,
      text,
      price,
      parentElement = '.menu__field .container',
      ...rest
    ) {
      this.imgSrc = imgSrc;
      this.altimg = this.altimg;
      this.title = title;
      this.text = text;
      this.currency = 27;
      this.price = price;
      this.parentElement = document.querySelector(parentElement);
      this.convertUAH();
      this.classes = rest;
    }

    convertUAH() {
      this.price = this.price * this.currency;
    }

    render() {
      const element = document.createElement('div');
      if (this.classes.length > 0) {
        element.classList.add('menu__item');
        this.classes.forEach((i) => element.classList.add(i));
      } else {
        element.classList.add('menu__item');
      }

      element.innerHTML = `<img src="${this.imgSrc}" alt="${this.altimg}">
                                <h3 class="menu__item-subtitle">${this.title}</h3>
                                <div class="menu__item-descr">
                                    ${this.text}
                                </div>
                                <div class="menu__item-divider"></div>
                                <div class="menu__item-price">
                                    <div class="menu__item-cost">Цена:</div>
                                    <div class="menu__item-total"><span> ${this.price}</span> грн/день</div>
                                </div>`;
      this.parentElement.append(element);
    }
  }

  const getResource = async (url) => {
    const res = await fetch(url);
    if(!res.ok) {
      throw new Error(`Couldn't fetch ${url} and status ${res.status}`);
    }
    return await res.json();
  }

  getResource('http://localhost:3000/menu')
  .then(data => {
    data.forEach(({img, altimg, title, descr, price}) => {
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    })
  })
};

export default cards;