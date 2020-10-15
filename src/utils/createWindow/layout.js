export default {
  global: {
    "tabSetEnableDeleteWhenEmpty": true,
    "tabSetHeaderHeight": 40,
    "tabSetTabStripHeight": 40,
    "enableEdgeDock": false,
    "tabEnableRename": false
  },
  layout: {
    "children": [
      {
        "type": "tabset",
        "id": "MAIN_WINDOW",
        "enableClose": false,
        "enableDeleteWhenEmpty": false,
        "weight": 50,
        "selected": 0,
        "children": []
      }
    ]
  }
};