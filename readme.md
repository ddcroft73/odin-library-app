# TOP Library project:

  Simple "Library" application for The Odin Project. I am a terrible web "designer" I have always struggled wiht any sort of gui and it takes me forever to decide and then implement any design. This is a very common design I'd seen used before. That being said I'm not sure if my CSS is right, but the design works. I can eventually implement any design I try. Just not fond of doing so. I did however enjoy the programming. The CSS is all over the place and as it started out well planned, It's not hard to let it get out of control. My focus will be on back end and as of starting this I'm only learning enough front end to make things work.

  This a pretty self explanatory project that will allow the user to add, edit and delete information about books. There is a feature that will allow a user to spit out sample data, and delete it just as easily.

  ## Features
  - Input validation and tooltip type popups to tell the user if they missed any input.
  - Auto capitilization of every word in te title and the author names.
  - string formatting of the number of pages so that commas are entered as needed.
  - One button invocation of sample data for 7 books.
  - One button removal of the sample data.
  - books are stored in localStorage where available.
  - each book ca be edited for the "read" property and each can be deleted.

  I wrote the code to take advantage of two OOD patterns.

  - Factory Function.
     - All book objects were created using a factory function. The book object was responsible for containg all data for a single book, as well as displaying the info, and carrying functions to create the Events and event handlers.
  - Module design.
     - I used an IIFE function to create a single "Library" object that handled any action associated with saving, updating, and deleting the books.

 <br>
 
 View it live [here](https://ddcroft73.github.io/odin-library-app/).     

