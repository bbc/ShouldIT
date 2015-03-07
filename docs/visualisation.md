---
layout: default
title:  "ShouldIT - Visualisation"

---

# Visualisation

## Semantic BDD

![image](img/visualisation/full-page.png)

One of the main selling points of ShouldIT? is the ability to create a map of all of your features and to be able to a visualisation of the progress of your project including test outcomes. ShouldIT? will automatically know about your top level nested relationships.

## Feature Files

Write feature files as you normally would. The following is a sample subset of what a feature file for a shopping site might look like.

### category_listing.feature.md
```
# Online Shopping System

## Category Listing Page

![image](img/category-page.png)

+ IT should display the number of products found

### Product

+ IT should display a thumbnail 
+ IT should display the product name 
+ IT should display the price

#### Sale Item

+ IT should display the original price
- IT should prepend the price with Now
+ IT should display the discount as a percentage
  - eg 40% off
```




### pagination.feature.md
```
# Pagination

+ IT should display next and previous links when available
+ IT should display the first page link as a number
+ IT should display the last page link as a number
+ IT should display a deliminator '...' when there are gaps between page numbers
+ IT should not have a link for the current page

## First 4 pages

![image](img/pagination-first.png)

+ IT should display up to the first 5 page numbers when available

## Inbetween pages

![image](img/pagination-inbetween.png)

e.g if 17 pages total 5-13

+ IT should display 2 pages either side of the current page

## Last 4 pages

![image](img/pagination-last.png)

e.g if 17 pages total 14-17

+ IT should display the 5 last page numbers
```



###
```
# Blog

We will very soon write some great features for our blog in here!
```

## Map file

If in your `ShouldIT?` conf file you set a property like `{ map: 'features/map.yaml'}` you then have the ability to further express the relationships between features.

In Yaml you simply append a context to the node of another.

```yaml
Online Shopping System Category Listing Page:
    - Online Shopping System Category Listing API
    - Pagination
Blog:
    - Pagination
```

So in this case the `Online Shopping System Category Listing Page` has a dependency on 2 features:

 + Online Shopping System Category Listing API
 + Pagination

Where `Blog` is dependant on only the `pagination` feature.
 
By then adding this map your visualisation will show even further the relationship between the features.