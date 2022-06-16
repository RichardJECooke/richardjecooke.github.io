---
layout: layout_post.html
title: How to make a custom getter & setter for an ActiveRecord (Ruby on Rails) model's attributes/properties
tags: ['post', 'activeRecord', 'rails', 'ruby', 'ruby on rails', 'coding']
date: 2016-12-07 13:12:00
---

```php
class Person < ActiveRecord::Base

# don't use attr_accessible here as it interferes/duplicates the methods below

# setter
```php
def shirt=(value)
  write\_attribute(:shirt_fee_in_cents, value)
end

# getter
def shirt
  if self[:shirt].present?
    return self[:shirt]
  end
  AverageHuman.default_shirt
end
```
