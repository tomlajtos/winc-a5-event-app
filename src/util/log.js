// helpers functions
const testObjPrototypeName = (obj, regEx) =>
  regEx.test(Object.getPrototypeOf(obj, regEx).name);

const testObjConstructorName = (obj, regEx) =>
  regEx.test(Object.getPrototypeOf(obj).constructor?.name);

const logValueArray = (valArr, color) =>
  valArr.map((val) => {
    console.log(
      `%c${val[0]}(${typeof val[1]}):`,
      `color:${color};font-weight:800`,
      val[1],
    );
  });

const logErrorObjProperties = (errObj) =>
  logValueArray(Object.entries(errObj), "#AF4050");

const logErrorObjectAsCollapsable = (errObj) => {
  console.groupCollapsed(
    `%c!${errObj.name || errObj.data.name} `,
    `color:#FC3030;background:#FED7D7cc;font-weight:800`,
  );
  logErrorObjProperties(errObj);
  console.groupEnd();
};

/**
 * log object with different methods to log stuff /w styles
 */
export const log = {
  render: (name, color, bg, padding) => {
    console.log(
      `%c${name}`,
      `color:${color};background:${bg};font-weight:800; padding:4px  ${
        8 + padding
      }px;border-radius:15px;border:1px solid ${bg.slice(0, 7)}`,
    );
  },

  // name is "string",
  // logs collapsable group if props[0] is nested array [["elem",elemVal],["elem2",elem2Val],...],
  // ...restOfprops: if many props > will log them all with the same name for all `name`;
  value: (name, ...props) => {
    // there is option to set color if not logged as collapsable group (i.e. single value or multi-value /w same name)
    // checks for color as hex-string after 'name'
    const color = /#\w{6}/.test(props[0]) ? props[0] : "#B794F4";

    if (props && Array.isArray(props[0])) {
      console.groupCollapsed(`%c${name} `, `color:#4299E1;font-weight:800`);
      logValueArray(props[0], "#ECC94B");
      console.groupEnd();
      return;
    }

    props.map((val) => {
      console.log(
        `%c${name}(${typeof val}):`,
        `color:${color};background:none;font-weight:800`,
        val,
      );
    });
  },

  process: (name, ...args) => {
    if (args && args.length > 0) {
      const color = args && args.length === 2 ? args[1] : "#48DB78";
      switch (args[0]) {
        case "start": {
          console.log(
            `%c>>> ${name} - ${args[0].toUpperCase()}`,
            `color:${color};background:none;font-weight:800`,
          );
          break;
        }
        case "end": {
          console.log(
            `%c<<< ${name} - ${args[0].toUpperCase()}`,
            `color:${color}cc;background:none;font-weight:800`,
          );
          break;
        }
        default: {
          console.log(
            `%c>>> ${name} <<<`,
            `color:${args[0]}69;background:none;font-weight:800`,
          );
        }
      }
    } else {
      console.log(
        `%c>>> ${name} <<<`,
        `color:#2A755A;background:none;font-weight:800`,
      );
    }
  },

  // error: function (message, ...args) {
  error: (...args) => {
    if (!args || args.length < 1) {
      console.log(
        `%c I need something to work with, eh?\n  A message(string) and an error(object) would be nice,\n  but an error(object) is the minimum I can work with.`,
      );
      return;
    }
    if (typeof args[0] === "string") {
      const message = args[0];
      console.groupCollapsed(
        `%c!Error - ${message} `,
        `color:#FC3030;background:#FED7D7cc;font-weight:800`,
      );
      if (!args[1]) {
        console.log(
          `%cThere is no details to show (argument needed: error,object).`,
          `color:#FC3030;font-weight:800`,
        );
        console.groupEnd();
        return;
      }
      console.log(args[1]);
      console.groupEnd();
    }
    if (
      testObjPrototypeName(args[0], /error/i) ||
      testObjConstructorName(args[0], /error/i)
    ) {
      logErrorObjectAsCollapsable(args[0]);
    }
  },
};
