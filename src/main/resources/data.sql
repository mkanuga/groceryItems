DROP TABLE IF EXISTS grocerycategory;

CREATE TABLE grocerycategory (
  category_name VARCHAR(40) PRIMARY KEY,
  category_description VARCHAR(40) NOT NULL
);


INSERT INTO grocerycategory (category_name, category_description) VALUES
  ('Frozen', 'All frozen goods'),
  ('Diary', 'All Dairy'),
  ('Baby', 'All Baby items'),
  ('Pet', 'All Pet items') ,
  ('Bakery', 'All Bakery items'),
  ('Meat Seafood', 'All Meat and Seafood items'),
  ('Drinks', 'All Drinks items'),
  ('International', 'All international items'),
  ('Medical', 'All Medical items'),
  ('Cosmetics', 'All Cosmetics items'),
  ('Garden', 'All Garden items');

DROP TABLE IF EXISTS groceryitem;

CREATE TABLE groceryitem (
  item_cd VARCHAR(40) PRIMARY KEY,
  item_name VARCHAR(40) NOT NULL,
  item_description VARCHAR(250) NOT NULL,
  item_category VARCHAR(250) NOT NULL,
  foreign key (item_category) references grocerycategory(category_name)
);
