import { checkAuth } from "../auth.js";

checkAuth();

const UPDATE_BUTTON_TEXT = "수정";
const ADD_BUTTON_TEXT = "추가";
const DELETE_BUTTON_TEXT = "삭제";
const SUB_CATEGORY_BUTTON_TEXT = "▼";

const categoryContainer =
  document.getElementsByClassName("category-container")[0];
const addCategoryButton = document.getElementsByClassName("add-category")[0];

addCategoryButton.addEventListener("click", () => {
  const categoryGroupDiv = document.getElementsByClassName("category-group");
  const lastCategoryGroup = categoryGroupDiv[categoryGroupDiv.length - 1];
  if (!lastCategoryGroup) {
    const dom = createCategoryDOM();
    categoryContainer.appendChild(dom);
    return;
  }
  const inputCategoryGroup = lastCategoryGroup.querySelector("input");
  const idValue = inputCategoryGroup.getAttribute("data-id");
  if (!idValue) {
    return;
  }

  const dom = createCategoryDOM();
  categoryContainer.appendChild(dom);
});

document.addEventListener("DOMContentLoaded", async () => {
  const categories = await getCategories();
  categories.forEach((category) => {
    const dom = createCategoryDOM(category);
    categoryContainer.appendChild(dom);
  });
});

async function getCategories() {
  const res = await fetch("/api/v1/categories");
  const categories = await res.json();
  return categories;
}

function createCategoryDOM(category) {
  const categoryGroupDiv = document.createElement("div");
  categoryGroupDiv.classList.add("category-group");

  const categoryDiv = document.createElement("div");
  categoryDiv.classList.add("category");

  const categoryNameDiv = inputDOM(category);
  const categorySubCategoryBtnDiv = subCategoryButton(category);
  const categoryUpdateBtnDiv = updateButtonDOM(category, "parent");
  const categoryDeleteBtnDiv = deleteButtonDOM(category);

  categoryDiv.appendChild(categoryNameDiv);
  categoryDiv.appendChild(categorySubCategoryBtnDiv);
  categoryDiv.appendChild(categoryUpdateBtnDiv);
  categoryDiv.appendChild(categoryDeleteBtnDiv);

  categoryGroupDiv.appendChild(categoryDiv);

  const subCategory = createSubCategoryDOM(category?.subCategories || []);
  categoryGroupDiv.appendChild(subCategory);

  return categoryGroupDiv;
}

function createSubCategoryDOM(subCategories) {
  const categoryGroupDiv = document.createElement("div");
  categoryGroupDiv.classList.add("subcategory-group");

  const subCategoryAddButton = subCategoryAddButtonDOM();
  categoryGroupDiv.appendChild(subCategoryAddButton);

  subCategories.forEach((subCategory) => {
    const subCategoryDiv = createSubCategoryGroup(subCategory);
    categoryGroupDiv.appendChild(subCategoryDiv);
  });

  return categoryGroupDiv;
}

function createSubCategoryGroup(category) {
  const subCategoryDiv = document.createElement("div");
  subCategoryDiv.classList.add("subcategory");

  const nameDiv = inputDOM(category);
  const updateBtnDiv = updateButtonDOM(category, "sub");
  const deleteBtnDiv = deleteButtonDOM(category);

  subCategoryDiv.appendChild(nameDiv);
  subCategoryDiv.appendChild(updateBtnDiv);
  subCategoryDiv.appendChild(deleteBtnDiv);

  return subCategoryDiv;
}

function inputDOM(category) {
  const nameDiv = document.createElement("div");
  nameDiv.classList.add("column");
  const categoryNameInput = document.createElement("input");
  categoryNameInput.value = category?.name ?? "";
  if (category) {
    categoryNameInput.setAttribute("data-id", category._id);
  }
  nameDiv.appendChild(categoryNameInput);

  return nameDiv;
}

function subCategoryButton(category) {
  const categorySubCategoryBtnDiv = document.createElement("div");
  const subBtn = document.createElement("button");
  categorySubCategoryBtnDiv.classList.add("column");
  subBtn.innerHTML = SUB_CATEGORY_BUTTON_TEXT;
  subBtn.addEventListener("click", (e) => {
    const subcategories =
      e.target.parentElement.parentElement.nextElementSibling;
    subcategories.classList.toggle("show");
  });

  if (category) {
    categorySubCategoryBtnDiv.appendChild(subBtn);
  }

  return categorySubCategoryBtnDiv;
}

function updateButtonDOM(category, flg) {
  const updateBtnDiv = document.createElement("div");
  const updateBtn = document.createElement("button");
  updateBtn.innerHTML = category ? UPDATE_BUTTON_TEXT : "등록";
  updateBtnDiv.classList.add("column");
  if (category) {
    updateBtn.addEventListener("click", async (e) => {
      const value =
        e.target.parentElement.parentElement.querySelector("input").value;
      await putCategory(category._id, value);
    });
  } else {
    updateBtn.addEventListener("click", async (e) => {
      if (flg === "parent") {
        const parentInput =
          e.target.parentElement.parentElement.parentElement.querySelector(
            "input",
          );
        await postCategory(parentInput.value);
      } else if (flg === "sub") {
        const input =
          e.target.parentElement.parentElement.querySelector("input");
        const parentInput =
          e.target.parentElement.parentElement.parentElement.previousSibling.querySelector(
            "input",
          );
        await postCategory(input.value, parentInput.getAttribute("data-id"));
      }
    });
  }
  updateBtnDiv.appendChild(updateBtn);

  return updateBtnDiv;
}

function subCategoryAddButtonDOM() {
  const divContainer = document.createElement("div");
  divContainer.style.paddingLeft = "663px";

  const button = document.createElement("button");
  button.innerHTML = ADD_BUTTON_TEXT;
  button.addEventListener("click", (e) => {
    const parentElement = e.target.parentElement.parentElement;
    const groupArr = parentElement.querySelectorAll(".subcategory");
    const group = groupArr[groupArr.length - 1];
    if (!group) {
      const div = createSubCategoryGroup();
      e.target.parentElement.parentElement.appendChild(div);
      return;
    }
    const inputGroup = group.querySelector("input");
    const idValue = inputGroup.getAttribute("data-id");
    if (!idValue) {
      return;
    }
    const div = createSubCategoryGroup();
    e.target.parentElement.parentElement.appendChild(div);
  });

  divContainer.appendChild(button);

  return divContainer;
}

function deleteButtonDOM(category) {
  const deleteBtnDiv = document.createElement("div");
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = DELETE_BUTTON_TEXT;
  deleteBtnDiv.classList.add("column");
  if (category) {
    deleteBtn.addEventListener("click", async () => {
      await deleteCategory(category._id);
    });
    deleteBtnDiv.appendChild(deleteBtn);
  }

  return deleteBtnDiv;
}

async function postCategory(name, parentId) {
  try {
    const res = await fetch("/api/v1/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        parent: parentId,
      }),
    });
    if (res.ok) {
      alert("카테고리 등록 성공");
      location.reload();
    } else {
      alert("카테고리 등록 실패");
      console.log(res);
    }
  } catch (error) {
    console.error(error);
  }
}

async function deleteCategory(id) {
  try {
    const res = await fetch(`/api/v1/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      alert("카테고리 삭제 성공");
      location.reload();
    } else {
      alert("카테고리 삭제 실패");
      console.log(res);
    }
  } catch (error) {
    console.error(error);
  }
}

async function putCategory(id, name) {
  try {
    const res = await fetch(`/api/v1/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    });

    if (res.ok) {
      alert("카테고리 수정 성공");
      location.reload();
    } else {
      alert("카테고리 수정 실패");
      console.log(res);
    }
  } catch (error) {
    console.error(error);
  }
}
