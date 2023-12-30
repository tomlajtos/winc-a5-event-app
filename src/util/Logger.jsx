// import { log } from "./log";

export const log = {
  // console message on component render
  comp: (name, color, bg) => {
    console.log(
      `%c < ${name.toUpperCase()} /> `,
      `color:${color};background:${bg};font-weight:800`,
    );
  },
  render: (name, color, bg) => {
    console.log(
      `%c < ${name.toUpperCase()} /> `,
      `color:${color};background:${bg};font-weight:800`,
    );
  },
  // logs the name and value of a variable
  val: function (name = "", val = null) {
    const args = Array.from(arguments);
    const argNames = ["name", "val"];
    const errors = argNames
      .map((argN, index) => {
        if (!args[index]) {
          return argN;
        }
      })
      .filter((err) => err);

    if (errors.length) {
      console.log(
        `%cMissing OR Invalid Arg.(for: ${name}):`,
        "font-weight:800;color:orange",
        errors,
      );
      return;
    }

    console.log(
      `%c${name}(${typeof val}):`,
      `color:#B794F4;background:none;font-weight:800`,
      val,
    );
  },
  value: function (name = "", val = null) {
    const args = Array.from(arguments);
    const argNames = ["name", "val"];
    const errors = argNames
      .map((argN, index) => {
        if (!args[index]) {
          return argN;
        }
      })
      .filter((err) => err);

    if (errors.length) {
      console.log(
        `%cMissing OR Invalid Arg.(for: ${name}):`,
        "font-weight:800;color:orange",
        errors,
      );
      return;
    }

    console.log(
      `%c${name}(${typeof val}):`,
      `color:#B794F4;background:none;font-weight:800`,
      val,
    );
  },
};

export const Logger = (props) => {
  // log["props.type"](props.target,props.name,props.color,props.bg | props.name,props.value)
  let type = props.type ? props.type : "value";
  const target = props.target ? props.target : "default";
  const level = props.level ? props.level : 0;
  const color = {
    default: ["#fefefe"],
    component: [
      "#ffffff",
      "#F7FAFC",
      "#E2E8F0",
      "#1A202C",
      "#171923",
      "#000000",
    ],
    page: ["#1A365D", "#2A4365", "#2C5282", "#EBF8FF", "#BEE3F8", "#90CDF4"],
    // context: ["#FFF5F7", "#FED7E2", "#FBB6CE", "#F687B3", "#702459", "#521B41"],
    context: ["#ffff00", "#F6E05E", "#FAF089", "#FEFCBF", "#ED8936", "#DD6B20"],
  };
  const background = {
    default: ["#171923"],
    component: [
      "#ff0000",
      "#000000",
      "#2D3748",
      "#718096",
      "#CBD5E0",
      "#EDF2F7",
    ],
    page: ["#ffff00", "#FAF089", "#F6E05E", "#F6AD55", "#ED8936", "#DD6B20"],
    context: ["#322659", "#44337A", "#553C9A", "#B794F4", "#D6BCFA", "#E9D8FD"],
  };

  // switch (props.type) {
  //   case "render":
  //     log.render(props.name, props.color, props.bg);
  //     break;
  //   case "value":
  //     log.val(props.name, props.value);
  //     break;
  //   default:
  //     console.log(props);
  // }
  switch (type) {
    case "render":
      {
        switch (target) {
          case "component":
            {
              const name = props.name ? props.name : "no name(component)";
              log.render(
                name,
                color.component[level],
                background.component[level],
              );
            }
            break;
          case "context":
            {
              const name = props.name ? props.name : "no name(context)";
              log.render(name, color.context[level], background.context[level]);
            }
            break;
          case "page":
            {
              const name = props.name ? props.name : "no name(page)";
              log.render(name, color.page[level], background.page[level]);
            }
            break;
          case "default":
            {
              const name = props.name ? props.name : "no name(render)";
              log.render(name, color.default[level], background.default[level]);
            }
            break;
        }
      }
      break;
    case "value": {
      const name = props.name ? props.name : "no value name";
      const value = props.value ? props.value : "-";
      log.value(name, value);
    }
  }
  return null;
};
