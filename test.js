function a(...condition) {
  condition.forEach((elem) => {
    let sub = Object.keys(elem);
    sub.forEach((f) => {
      console.log(f,elem[f]);
    });
  });
}

a({ id: 1 }, { some: "ss" });
