# LEOFRESH ERPNext Simplification

## Introduction

- From the experience encountered due to the complexities associated with client UI hardening and technicalities involved in app development, this simpliERPNext was created to help solve this problems by mapping a the simpler interface into some easier to work with ERPNext, i.e., for non-technical users.

### Architecture

- Clean Architecture (with some hybrid deconcotions).
- Role Based Access Control - RBAC, this limits the users from accessing some core components/ pages on the mobile app.
- Role Base Authorization - Not entirely needed for this kind of app.

## Tasks

- Doctypes and access restructuring in this application interface.
- Data Access Implementation
  - [x] API implementation
    - [x] Profile [ ]TODO
    - [x] Customer
    - [x] Banking
    - [x] Expenses
    - [x] Price List - Refine the DTOs here and isolate them [ ]TODO
  - [x] DTO implementation
    - [x] Profile
    - [x] Customer
    - [x] banking
    - [x] expenses
    - [x] Price List - Refine the DTOs at this stage
  - [x] Models Migration
    - [x] Profile Migration
- [x] Repository Implementation
  - [x] Transfer the filters from the API's
- Domain
- [x]Entities
- [x] Services.(Remove to eliminate redundancies)

## Manufacturing

- WOrk on the BOM creation and order creation mechanism.
- Create an association of materials to be produced for example, if a user selects they want to manufacture 1Ltr bottled water, extract all the materials associated with 1Ltr's and the user just checks the ingredients needed to create the end product.
- [ ] Get the selected item also show the stock quantities.
- [ ] Get all items with the same name from App Storage.(Prefetch if they do not exist).
  - [ ] Check the product's current stock quantity.
  - [ ] Get the stock quantities and check against the quantities to produce before proceeding. If the quantities at the source warehouse do not match the needed quantities, show a link to raise a purchase order to the supplier.
  - [ ] If the stock quantities do match, then created a BOM or use an existing one with the same materials as the previous one.
  - [ ] Proceed to the work order with the selected quantities.

  ### UI FLOW
  - Create a multistepper form whereby:
    - 1. On the first page:-
      - Select the material you want to produce, and the quantities. Show the current quantities at the specific warehouse.
      - Check for existing BOM's depending on the source warehouse.
        - If none is found, create one,
        - If there is one for this item, then reselect one and have it reused.
    - 2. After that move with the BOM to the work order dialog and finish the manufacuting process.
    - Show a dialog of the completed materials and provide some links to either the **stock** or the **selling** pages.

- Think of finishing the work order programmatically. Once done, the rest of the application should be done properly.

  ### BOM/ Work Order Editing.
  - Redirect the user to the BOM page and toggle the BOM for editing purposes.
  - Once done, edit and save to persist the changes.

## Borehole Water.

- How can I setup borehole water to automatically use Raw Water at a zero rated value at the warehouse??. However, we might need to adjust for the cost of production to associate the amount from the final cost of raw water valuation which ineffect changes the purified water completion criteria.
