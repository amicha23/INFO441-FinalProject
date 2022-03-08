import { createText, setContent, createElement, addPropTransaction, propUpdater, append } from "vidact/runtime";
/*--- Import Vidact Runtime Helpers ---*/

// import React, { useState } from 'react';
import { Collapse, Button, FormGroup } from 'reactstrap';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip'; //to show numbers on the filter

function ValueLabelComponent(__internal_props) {
  const __props_transactions = new Map();

  let children, open, value;

  const _executer = () => {
    children = __internal_props.children;
  };

  _executer();

  const _executer2 = () => {
    open = __internal_props.open;
  };

  _executer2();

  const _executer3 = () => {
    value = __internal_props.value;
  };

  _executer3();

  let _el_3;

  const _el_3_update = () => {
    if (!_el_3) _el_3 = createText();
    _el_3.element = setContent(_el_3.element, children);
  };

  _el_3_update();

  let _el__instance = Tooltip({
    open: open,
    enterTouchDelay: 0,
    placement: "top",
    title: value,
    children: _el_3
  }),
      _el_ = _el__instance.element;

  const _executer4 = () => {
    addPropTransaction(__props_transactions, _el__instance, "open", open);
  };

  _executer4();

  const _executer5 = () => {
    addPropTransaction(__props_transactions, _el__instance, "enterTouchDelay", 0);
  };

  _executer5();

  const _executer6 = () => {
    addPropTransaction(__props_transactions, _el__instance, "title", value);
  };

  _executer6();

  const _executer7 = () => {
    addPropTransaction(__props_transactions, _el__instance, "children", _el_3);
  };

  _executer7();

  return {
    element: _el_,
    updateProps: propUpdater(__internal_props, [_executer, _executer2, _executer3, _el_3_update, _executer4, _executer6], [["children", [0
    /*_executer*/
    , 3
    /*_el_3_update*/
    ]], ["open", [1
    /*_executer2*/
    , 4
    /*_executer4*/
    ]], ["value", [2
    /*_executer3*/
    , 5
    /*_executer6*/
    ]]], true, __props_transactions)
  };
}

export function DistanceAwayFilter(__internal_props) {
  const __internal_state = {
    _s: false,
    _s2: 5
  };

  const __props_transactions = new Map();

  let isOpen, toggle, val, updateRange;

  // distanceAway component takes in an object prop "updateDistanceAwayFilter" that will update the state in Main through "changeUpdateDistanceAway"
  // distanceAwayFilter component takes in an object prop "filterCallback" which is a callback function that call "handleFilter" in Main to re-render the listings shown
  const setIsOpen = value => {
    updateState({
      _s: value
    });
  };

  const _executer8 = () => {
    isOpen = __internal_state._s;
  };

  _executer8();

  const _executer9 = () => {
    toggle = () => setIsOpen(!isOpen);
  }; // Our States


  _executer9();

  const setValue = value => {
    updateState({
      _s2: value
    });
  };

  const _executer10 = () => {
    val = __internal_state._s2;
  };

  _executer10();

  // Changing State when volume increases/decreases
  const _executer11 = () => {
    updateRange = (event, newValue) => {
      setValue(newValue);

      __internal_props.updateDistanceAwayFilter(val); //updates state in props


      __internal_props.filterCallback(); //will use handlefilter callback to filter listings

    };
  }; //filter slider for distance away


  _executer11();

  let _el_8 = createText("Max distance away from campus");

  let _el_7_instance = Button({
    className: "btn filter",
    id: "DistanceAwayfilterbtn",
    onClick: toggle,
    style: {
      marginBottom: '1rem'
    },
    children: _el_8
  }),
      _el_7 = _el_7_instance.element;

  const _executer12 = () => {
    addPropTransaction(__props_transactions, _el_7_instance, "onClick", toggle);
  };

  _executer12();

  const _executer13 = () => {
    addPropTransaction(__props_transactions, _el_7_instance, "style", {
      marginBottom: '1rem'
    });
  };

  _executer13();

  const _executer14 = () => {
    addPropTransaction(__props_transactions, _el_7_instance, "children", _el_8);
  };

  _executer14();

  let _el_9 = createText(" ");

  let _el_16_instance = Slider({
    value: val,
    ValueLabelComponent: ValueLabelComponent,
    onChange: updateRange,
    min: 0,
    step: 1,
    max: 5
  }),
      _el_16 = _el_16_instance.element;

  const _executer15 = () => {
    addPropTransaction(__props_transactions, _el_16_instance, "value", val);
  };

  _executer15();

  const _executer16 = () => {
    addPropTransaction(__props_transactions, _el_16_instance, "ValueLabelComponent", ValueLabelComponent);
  };

  _executer16();

  const _executer17 = () => {
    addPropTransaction(__props_transactions, _el_16_instance, "onChange", updateRange);
  };

  _executer17();

  const _executer18 = () => {
    addPropTransaction(__props_transactions, _el_16_instance, "min", 0);
  };

  _executer18();

  const _executer19 = () => {
    addPropTransaction(__props_transactions, _el_16_instance, "step", 1);
  };

  _executer19();

  const _executer20 = () => {
    addPropTransaction(__props_transactions, _el_16_instance, "max", 5);
  };

  _executer20();

  let _el_14 = createElement("div", {
    className: "filterbtn"
  });

  const _executer21 = () => {
    append(_el_14, _el_16);
  };

  _executer21();

  let _el_12_instance = FormGroup({
    className: "range-wrap",
    children: _el_14
  }),
      _el_12 = _el_12_instance.element;

  const _executer22 = () => {
    addPropTransaction(__props_transactions, _el_12_instance, "children", _el_14);
  };

  _executer22();

  let _el_10_instance = Collapse({
    isOpen: isOpen,
    children: _el_12
  }),
      _el_10 = _el_10_instance.element;

  const _executer23 = () => {
    addPropTransaction(__props_transactions, _el_10_instance, "isOpen", isOpen);
  };

  _executer23();

  const _executer24 = () => {
    addPropTransaction(__props_transactions, _el_10_instance, "children", _el_12);
  };

  _executer24();

  let _el_5 = createElement("div");

  append(_el_5, _el_7, _el_9, _el_10);
  const updateState = propUpdater(__internal_state, [_executer8, _executer9, _executer10, _executer11, _executer12, _executer15, _executer17, _executer23], [["_s", [0
  /*_executer8*/
  , 1
  /*_executer9*/
  , 4
  /*_executer12*/
  , 7
  /*_executer23*/
  ]], ["_s2", [2
  /*_executer10*/
  , 3
  /*_executer11*/
  , 6
  /*_executer17*/
  , 5
  /*_executer15*/
  ]]], false, __props_transactions);
  return {
    element: _el_5,
    updateProps: () => {}
  };
}
export default DistanceAwayFilter;