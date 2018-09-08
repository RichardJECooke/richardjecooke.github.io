---
layout: post
title: How to make a custom getter & setter for an ActiveRecord (Ruby on Rails) model's attributes/properties
tags:
  - activeRecord
  - rails
  - ruby
categories:
  - ruby on rails
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
