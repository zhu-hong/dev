import data from './data'

class SSQ {
  constructor (data, ps, cs, ds) {
    this.data = data;
    this.provinceSelect = document.querySelector(ps);
    this.citySelect = document.querySelector(cs);
    this.districtSelect = document.querySelector(ds);
    this.init();
  }

  current = {
    provinceIdx: 0,
    cityIdx: 0,
    districtIdx: 0,
  }
  
  init () {
    let __this = this;
  
    this.current = new Proxy(this.current, {
      get () {
        return Reflect.get(...arguments);
      },
  
      set (target, key) {
        Reflect.set(...arguments);
  
        if (key === 'provinceIdx') {
          __this.current.cityIdx = 0;
          __this.loadCityOption();
        }
  
        if(key === 'cityIdx') {
          __this.current.districtIdx = 0;
          __this.loadDistrictOption();
        }
  
        return true;
      }
    })

    this.LoadOption();
    this.bindEvent();
  }

  LoadOption () {
    this.loadProvinceOption();
    this.loadCityOption();
    this.loadDistrictOption();
  }

  bindEvent () {
    let __this = this;

    this.provinceSelect.addEventListener('change', function () {
      __this.current.provinceIdx = this.selectedIndex;
    })
    
    this.citySelect.addEventListener('change', function () {
      __this.current.cityIdx = this.selectedIndex;
    })
    
    this.districtSelect.addEventListener('change', function () {
      __this.current.districtIdx = this.selectedIndex;
    })
  }

  getCurrentCitys () {
    let citys;

    this.data.forEach(({ city }, index) => {
      if (index === this.current.provinceIdx) {
        citys = city;
        return;
      }
    })
    
    return citys;
  }

  getCurrentDistricts () {
    let citys = this.getCurrentCitys(),
        districts;

    citys.forEach(({ district }, index) => {
      if (index === this.current.cityIdx) {
        districts = district;
        return;
      }
    })

    return districts;
  }

  loadProvinceOption () {
    let provinceFrag = document.createDocumentFragment();

    this.data.forEach(({ province }, index) => {
      let provinceOption = index === this.current.provinceIdx ? new Option(province, province, true, true) : new Option(province, province);
      provinceFrag.append(provinceOption);
    });

    this.provinceSelect.append(provinceFrag);
  }

  loadCityOption () {
    let citys = this.getCurrentCitys(),
        citysFrag = document.createDocumentFragment();

    this.clearOptions(this.citySelect, citys);

    citys.forEach(({ name }, index) => {
      let cityOption = index === this.current.cityIdx ? new Option(name, name, true, true) : new Option(name, name);
      citysFrag.append(cityOption);
    });

    this.citySelect.append(citysFrag);
  }

  loadDistrictOption () {
    let districts = this.getCurrentDistricts(),
        districtsFrag = document.createDocumentFragment();

    this.clearOptions(this.districtSelect, districts);

    districts.forEach((item, index) => {
      let districtOption = index === this.current.districtIdx ? new Option(item, item, true, true) : new Option(item, item);
      districtsFrag.append(districtOption);
    })

    this.districtSelect.append(districtsFrag);
  }

  clearOptions (selector, data) {
    Array.from(selector.children).forEach(item => {
      item.remove();
    })

    selector.style.visibility = !data.length ? 'hidden' : 'visible';
  }
}

new SSQ(data, '#province', '#city', '#district');