import Tab from './Tab';

;(() => {
  const init = () => {
    const tab: Tab = new Tab({
      el: '.tab',
      type: 'slide',
    });

    tab.create();
  }

  init();
})()