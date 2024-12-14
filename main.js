const name = document.querySelector("#courseName");
const category = document.querySelector("#courseCategory");
const price = document.querySelector("#coursePrice");
const description = document.querySelector("#courseDescription");
const capacity = document.querySelector("#courseCapacity");
const submit = document.querySelector("#click");
const deletebtn = document.querySelector("#deleteBtn");
let courses = [];

const displayProduct = () => {
  const result = courses
    .map((course, index) => {
      return `
    <tr>
    <td>${index} </td>
    <td>${course.name} </td>
    <td>${course.category} </td>
    <td>${course.price} </td>
    <td>${course.description} </td>
    <td>${course.capacity} </td>
    <td>
    <button class = "btn btn-danger" onclick = 'deleteCourse(${index})'>dellete </button>
    </td>

    </tr>
    `;
    })
    .join("");

  document.querySelector("#data").innerHTML = result;
};
function deleteCourse(index) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        courses.splice(index, 1);
        localStorage.setItem("courses", JSON.stringify(courses));
        displayProduct();
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });
}
if (localStorage.getItem("courses") != null) {
  courses = JSON.parse(localStorage.getItem("courses"));
  displayProduct();
}
submit.addEventListener("click", (e) => {
  e.preventDefault();
  const namePattern = /^[A-Z][a-z]{2,10}$/;
  if (namePattern.test(name.value)) {
    const course = {
      name: name.value,
      category: category.value,
      price: price.value,
      description: description.value,
      capacity: capacity.value,
    };
    courses.push(course);
    console.log(courses);
    localStorage.setItem("courses", JSON.stringify(courses));
    displayProduct();
    Swal.fire({
      title: "Course Added !",
      text: "You clicked the button!",
      icon: "success",
    });
  } else {
    alert("the name is not ok ");
  }
});

deletebtn.addEventListener("click", () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        courses = [];
        localStorage.setItem("courses", JSON.stringify(courses));
        displayProduct();
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });
});
