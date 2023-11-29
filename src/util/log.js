export const log = {
  // console message on component render
  comp: (name, color, bg) => {
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
};
