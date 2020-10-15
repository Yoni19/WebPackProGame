const weekOrAll = () => {
    const selection = document.getElementById("selection");
    selection.innerHTML = `
      <a class="btn" href="#games/this-week">
        <button class="btn btn_input">Les mieux notés cette semaine </button>
      </a>
      <a class="btn" href="#games/all-time-best">
        <button class="btn btn_input">Les mieux notés jusqu'à aujourd'hui</button>
      </a>
    `;
  };

  export{weekOrAll};