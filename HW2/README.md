SSW-345 HW2

![UML Diagrams](https://user-images.githubusercontent.com/29928870/153733235-39c086f3-90a6-452c-b1e9-76c3c44d14df.png)

The above picture has all three diagrams in one file.

Use-Case diagram: I was a little confused on whether to use the stack within this diagram or not. But basically, the user goes through the website to intereact with everything. On the frontend server, you don't want any private keys on there which is why you then need to connect to a backend server (the API), which then connects to payment server and database server. The backend server will get information from these servers and send back to user.

Class Diagram: The customer class connects to three other classes: the storeFront (bookStore), their own cart, and then payment processing / information class. From the diagram, the payment processing takes in a CC class and a shipping / billing class. This is used for the user to take in multiple address and CC cards. The cart is then connected to the payment processor for the user to checkout.

Sequence Diagram: This is a sequence diagram of a user searching for a book, adding to cart, adding payment information, and checking out. I skipped the login process here. The two for loops are used for adding multiple payment methods and adding / searching for multiple books.
