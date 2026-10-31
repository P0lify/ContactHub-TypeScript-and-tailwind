declare const Swal: any;
// Contact Model
const contactModal = document.getElementById("contactModal");
// Contact Button
const addContactBtn = document.getElementById("addContactBtn");
// Contact Close
const closeModalBtn = document.getElementById("closeModalBtn");
// Contact Cancel
const cancelModalBtn = document.getElementById("cancelModalBtn");
// Inputs
const contactName = document.getElementById("contactName") as HTMLInputElement;
const contactPhone = document.getElementById(
  "contactPhone",
) as HTMLInputElement;
const contactEmail = document.getElementById(
  "contactEmail",
) as HTMLInputElement;
const contactAddress = document.getElementById(
  "contactAddress",
) as HTMLInputElement;
const contactGroup = document.getElementById(
  "contactGroup",
) as HTMLInputElement;
const contactNotes = document.getElementById(
  "contactNotes",
) as HTMLInputElement;
const contactFavorite = document.getElementById(
  "contactFavorite",
) as HTMLInputElement;
const contactEmergency = document.getElementById(
  "contactEmergency",
) as HTMLInputElement;
// Error Message
const contactNameError = document.getElementById("contactNameError");
const contactPhoneError = document.getElementById("contactPhoneError");
const contactEmailError = document.getElementById("contactEmailError");
// Contact Form
const contactForm = document.getElementById("contactForm");
// Contacts Grid
const contactsGrid = document.querySelector(
  "#contacts-grid > div",
) as HTMLDivElement;
// Count
const totalContacts = document.getElementById(
  "total-contacts",
) as HTMLSpanElement;
const contactsCount = document.getElementById(
  "contacts-count",
) as HTMLSpanElement;
const totalFavorites = document.getElementById(
  "favorite-contacts",
) as HTMLSpanElement;
const totalEmergencies = document.getElementById(
  "total-emergencies",
) as HTMLSpanElement;
// Right Sidebar
const favoritesSection = document.getElementById("favCard") as HTMLDivElement;
const emergencySection = document.getElementById("emergCard") as HTMLDivElement;
// save contact button
const saveContactBtn = document.getElementById(
  "saveContactBtn",
) as HTMLButtonElement;
// update contact button
const updateContactBtn = document.getElementById(
  "updateContactBtn",
) as HTMLButtonElement;
// search input
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
// First load
let contacts: any[] = JSON.parse(localStorage.getItem("contacts")!) || [];
displayContacts(contacts);
// save to local storage
function saveContactsToLocalStorage() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}
// Appear && disapper model
closeModalBtn?.addEventListener("click", () =>
  contactModal?.classList.add("hidden"),
);
cancelModalBtn?.addEventListener("click", () =>
  contactModal?.classList.add("hidden"),
);
// modal form submit event listener
contactForm?.addEventListener("submit", function (e: Event) {
  e.preventDefault();
});
// Clear form
function clearForm() {
  contactName.value = "";
  contactPhone.value = "";
  contactEmail.value = "";
  contactAddress.value = "";
  contactGroup.value = "";
  contactNotes.value = "";
  contactFavorite.checked = false;
  contactEmergency.checked = false;
}
// Add contact
addContactBtn?.addEventListener("click", () => {
  contactModal?.classList.remove("hidden");
  clearForm();

  saveContactBtn?.addEventListener("click", function addContact() {
    const newContact = {
      fullName: contactName?.value,
      phoneNumber: contactPhone?.value,
      emailAddress: contactEmail?.value,
      address: contactAddress?.value,
      group: contactGroup?.value,
      notes: contactNotes?.value,
      isFavorite: contactFavorite?.checked,
      isEmergency: contactEmergency?.checked,
    };
    contacts.push(newContact);
    saveContactsToLocalStorage();

    contactModal?.classList.add("hidden");
    Swal.fire({
      title: "Added!",
      text: "Contact has been added successfully.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });

    clearForm();
    displayContacts(contacts);
  });
});
// Display contacts
function displayContacts(data: any[]) {
  let favCount = 0,
    emergencyCount = 0;

  let favoritesBox = "";
  let emergencyBox = "";

  let contactsHTML = "";

  if (!data || data.length === 0) {
    contactsGrid.innerHTML = `
              <div class="col-span-full text-center py-20">
                <div
                  class="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center"
                >
                  <i
                    class="fa-solid fa-address-book text-3xl text-gray-300"
                  ></i>
                </div>
                <p class="text-gray-500 font-medium">No contacts found</p>
                <p class="text-gray-400 text-sm mt-1">
                  Click "Add Contact" to get started
                </p>
              </div>
    `;
  } else {
    data.forEach((contact, index) => {
      contactsHTML += `
                <div
                  class="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-200 overflow-hidden h-full flex flex-col"
                >
                  <!-- Header -->
                  <div class="p-4 pb-3 flex-1">
                    <div class="flex items-start gap-3.5">
                      <div class="relative shrink-0">
                        <div
                          class="w-14 h-14 text-lg rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold shadow-sm ${contact.isFavorite ? "favorite" : ""} ${contact.isEmergency ? "emergency" : ""}"
                        >
                          ${contact.fullName.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div class="flex-1 min-w-0 pt-1">
                        <h3
                          class="font-semibold text-gray-900 text-base truncate"
                        >
                          ${contact.fullName}
                        </h3>
                        <div class="flex items-center gap-2 mt-1">
                          <div
                            class="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center shrink-0"
                          >
                            <i
                              class="fa-solid fa-phone text-blue-600 text-[9px]"
                            ></i>
                          </div>
                          <span class="text-gray-500 text-sm truncate"
                            >${contact.phoneNumber}</span
                          >
                        </div>
                      </div>
                    </div>
                    <!-- Contact Details -->
                    <div class="mt-3 space-y-2">
                      <div class="flex items-center gap-2.5">
                        <div
                          class="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center shrink-0"
                        >
                          <i
                            class="fa-solid fa-envelope text-violet-600 text-[10px]"
                          ></i>
                        </div>
                        <span class="text-gray-600 text-sm truncate"
                          >${contact.emailAddress}</span
                        >
                      </div>
                      <div class="flex items-center gap-2.5">
                        <div
                          class="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0"
                        >
                          <i
                            class="fa-solid fa-location-dot text-emerald-600 text-[10px]"
                          ></i>
                        </div>
                        <span class="text-gray-600 text-sm truncate"
                          >${contact.address}</span
                        >
                      </div>
                    </div>
                    <div class="flex flex-wrap gap-1.5 mt-3">
                      ${contact.group === "" ? "" : '<span class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-[11px] font-medium rounded-md capitalize"> ' + contact.group + " </span>"}
                      ${contact.isEmergency ? '<span class="inline-flex items-center gap-1 px-2 py-1 bg-rose-50 text-rose-600 text-[11px] font-medium rounded-md"><i class="fa-solid fa-heart-pulse"></i>Emergency</span>' : ""}
                    </div>
                  </div>
                  <!--  Actions Footer  -->
                  <div
                    class="border-t border-gray-100 bg-gray-50/80 px-4 py-2.5 flex items-center justify-between mt-auto"
                  >
                    <div class="flex items-center gap-1.5">
                      <a
                        class="w-9 h-9 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-all flex items-center justify-center cursor-pointer"
                        href="tel:${contact.phoneNumber}"
                        title="Call"
                        target="blank"
                      >
                        <i class="fa-solid fa-phone text-sm"></i>
                      </a>
                      <a
                        class="w-9 h-9 hover:text-amber-400 rounded-lg transition-all flex items-center justify-center cursor-pointer text-violet-600 bg-violet-50 hover:bg-violet-100"
                        href="mailto:${contact.emailAddress}"
                        title="Message"
                        target="blank"
                      >
                        <i class="fa-solid fa-envelope text-sm"></i>
                      </a>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <button
                        class="w-9 h-9 hover:text-amber-400 rounded-lg transition-all flex items-center justify-center cursor-pointer ${contact.isFavorite ? "text-amber-400 bg-amber-50 hover:bg-amber-100" : "text-gray-400 bg-gray-50 hover:bg-gray-100 "}"
                        title="Favorite"
                        onclick="favouriteToggle(${index})"
                      >
                        ${contact.isFavorite ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i> '}
                      </button>
                      <button
                        class="w-9 h-9 hover:text-rose-500 rounded-lg transition-all flex items-center justify-center cursor-pointer ${contact.isEmergency ? "text-rose-500 bg-rose-50 hover:bg-rose-100" : "text-gray-400 bg-gray-50 hover:bg-gray-100 "}"
                        title="Emergency"
                        onclick="emergencyToggle(${index})"
                      >
                        ${contact.isEmergency ? '<i class="fa-solid fa-heart-pulse"></i>' : '<i class="fa-regular fa-heart"></i>'}
                      </button>
                      <button
                        class="w-9 h-9 bg-gray-50 text-gray-500 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all flex items-center justify-center cursor-pointer"
                        title="Edit"
                        onclick="editContact(${index})"
                      >
                        <i class="fa-solid fa-pencil"></i>
                      </button>
                      <button
                        class="w-9 h-9 bg-gray-50 text-gray-500 rounded-lg hover:bg-rose-50 hover:text-rose-600 transition-all flex items-center justify-center cursor-pointer"
                        title="Delete"
                        onclick="deleteContact(${index})"
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
        `;
      //  favourite
      if (contact.isFavorite) {
        favoritesBox += `
                  <div class="space-y-3 max-h-80 overflow-y-auto scrollbar-hide">
                    <div class="flex items-center gap-3 p-2.5 bg-gray-50 hover:bg-amber-50 rounded-xl transition-all cursor-pointer group">
                      <div class="shrink-0">
                        <div class="w-10 h-10 text-sm rounded-lg bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-semibold shadow-sm">
                          ${contact.fullName.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div class="flex-1 min-w-0">
                        <h4 class="font-medium text-gray-900 text-sm truncate">${contact.fullName}</h4>
                        <p class="text-xs text-gray-500 truncate">${contact.phoneNumber}</p>
                      </div>
                      <a href="tel:${contact.phoneNumber}" class="shrink-0 w-8 h-8 bg-emerald-100 group-hover:bg-emerald-500 text-emerald-600 group-hover:text-white rounded-lg transition-all flex items-center justify-center cursor-pointer">
                        <i class="fa-solid fa-phone text-sm"></i>
                      </a>
                    </div>
                  </div>
        `;
      }
      //  emergency
      if (contact.isEmergency) {
        emergencyBox += `
                  <div class="space-y-3 max-h-80 overflow-y-auto scrollbar-hide">
                    <div class="flex items-center gap-3 p-2.5 bg-gray-50 hover:bg-amber-50 rounded-xl transition-all cursor-pointer group">
                      <div class="shrink-0">
                        <div class="w-10 h-10 text-sm rounded-lg bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-semibold shadow-sm">
                          ${contact.fullName.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div class="flex-1 min-w-0">
                        <h4 class="font-medium text-gray-900 text-sm truncate">${contact.fullName}</h4>
                        <p class="text-xs text-gray-500 truncate">${contact.phoneNumber}</p>
                      </div>
                      <a href="tel:${contact.phoneNumber}" class="shrink-0 w-8 h-8 bg-emerald-100 group-hover:bg-emerald-500 text-emerald-600 group-hover:text-white rounded-lg transition-all flex items-center justify-center cursor-pointer">
                        <i class="fa-solid fa-phone text-sm"></i>
                      </a>
                    </div>
                  </div>
        `;
      }
      // Counter
      if (contact.isFavorite) {
        favCount++;
      }
      if (contact.isEmergency) {
        emergencyCount++;
      }
    });
    contactsGrid.innerHTML = contactsHTML;
  }
  // No Fav & Emergency
  // Favorites
  if (favCount === 0) {
    favoritesSection.innerHTML = `
              <div class="col-span-2 text-center py-8">
                <p class="text-gray-400 text-sm">No favorites yet</p>
              </div>
    `;
  } else {
    favoritesSection.innerHTML = favoritesBox;
  }
  // Emergency
  if (emergencyCount === 0) {
    emergencySection.innerHTML = `
              <div class="col-span-2 text-center py-8">
                <p class="text-gray-400 text-sm">No emergency contacts</p>
              </div>
    `;
  } else {
    emergencySection.innerHTML = emergencyBox;
  }
  // Counters
  contactsCount.innerHTML = contacts.length.toString();
  totalContacts.innerHTML = contacts.length.toString();
  totalFavorites.innerHTML = favCount.toString();
  totalEmergencies.innerHTML = emergencyCount.toString();
}
// Delete contact
function deleteContact(index: number) {
  Swal.fire({
    title: "Delete Contact?",
    text: "Are you sure you want to delete Palmer Parrish? This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result: any) => {
    if (result.isConfirmed) {
      contacts.splice(index, 1);
      saveContactsToLocalStorage();
      displayContacts(contacts);

      Swal.fire({
        title: "Deleted!",
        text: "Contact has been deleted.",
        icon: "success",
      });
    }
  });
}
(window as any).deleteContact = deleteContact;
// Edit contact
let updateIndex = 0;
function editContact(index: number) {
  updateIndex = index;
  contactModal?.classList.remove("hidden");

  const contact = contacts[index];

  contactName.value = contact.fullName;
  contactPhone.value = contact.phoneNumber;
  contactEmail.value = contact.emailAddress;
  contactAddress.value = contact.address;
  contactGroup.value = contact.group;
  contactNotes.value = contact.notes;
  contactFavorite.checked = contact.isFavorite;
  contactEmergency.checked = contact.isEmergency;

  saveContactBtn?.classList.add("hidden");
  updateContactBtn?.classList.remove("hidden");
}
function updateContact() {
  contacts[updateIndex] = {
    fullName: contactName.value,
    phoneNumber: contactPhone.value,
    emailAddress: contactEmail.value,
    address: contactAddress.value,
    group: contactGroup.value,
    notes: contactNotes.value,
    isFavorite: contactFavorite.checked,
    isEmergency: contactEmergency.checked,
  };
  saveContactsToLocalStorage();

  contactModal?.classList.add("hidden");
  displayContacts(contacts);

  Swal.fire({
    title: "Updated!",
    text: "Contact has been updated successfully.",
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
  });

  contactModal?.classList.add("hidden");

  saveContactBtn?.classList.remove("hidden");
  updateContactBtn?.classList.add("hidden");
}
(window as any).editContact = editContact;
(window as any).updateContact = updateContact;
// Search contacts
searchInput?.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.fullName.toLowerCase().includes(searchTerm) ||
      contact.phoneNumber.toLowerCase().includes(searchTerm) ||
      contact.emailAddress.toLowerCase().includes(searchTerm),
  );
  displayContacts(filteredContacts);
});
// Toggle Favourite && Emergency
function favouriteToggle(data: number) {
  contacts[data].isFavorite = !contacts[data].isFavorite;
  saveContactsToLocalStorage();
  displayContacts(contacts);
}
function emergencyToggle(data: number) {
  contacts[data].isEmergency = !contacts[data].isEmergency;
  saveContactsToLocalStorage();
  displayContacts(contacts);
}
(window as any).favouriteToggle = favouriteToggle;
(window as any).emergencyToggle = emergencyToggle;
