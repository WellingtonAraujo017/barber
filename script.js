const dias = ["Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

function gerarHorarios(inicio, fim) {
  let horarios = [];
  let [hora, min] = inicio.split(":").map(Number);

  while (
    hora < parseInt(fim.split(":")[0]) ||
    (hora === parseInt(fim.split(":")[0]) && min <= parseInt(fim.split(":")[1]))
  ) {
    let h = String(hora).padStart(2, "0");
    let m = String(min).padStart(2, "0");
    horarios.push(`${h}:${m}`);

    min += 30;
    if (min >= 60) {
      min = 0;
      hora++;
    }
  }
  return horarios;
}

const horariosManha = gerarHorarios("08:00", "11:00");
const horariosTarde = gerarHorarios("13:00", "17:00");
const horariosDia = [...horariosManha, ...horariosTarde];

const conteudo = document.getElementById("conteudo-abas");

function mostrarDia(dia) {
  conteudo.innerHTML = "";

  let ul = document.createElement("ul");
  let li = document.createElement("li");
  li.textContent = dia + ": ";

  horariosDia.forEach(hora => {
    let btn = document.createElement("button");
    btn.textContent = hora;
    btn.classList.add("horario");
    btn.addEventListener("click", () => reservar(btn));
    li.appendChild(btn);
  });

  ul.appendChild(li);
  conteudo.appendChild(ul);
}

function reservar(botao) {
  if (!botao.classList.contains("reservado")) {
    botao.classList.add("reservado");
    botao.textContent += " ✔ Reservado";
    alert("Você reservou o horário: " + botao.textContent);
  }
}

const tabBtns = document.querySelectorAll(".tab-btn");
tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".tab-btn.active").classList.remove("active");
    btn.classList.add("active");
    mostrarDia(btn.dataset.dia);
  });
});

