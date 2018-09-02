---
layout: post
title: >-
  How to make a custom getter & setter for an ActiveRecord (Ruby on Rails)
  model's attributes/properties
tags:
  - ActiveRecord
  - Rails
  - Ruby
url: 8060.html
id: 8060
categories:
  - Ruby on Rails
date: 2016-12-07 13:12:00
---

class Person < ActiveRecord::Base

\# don't use attr_accessible here as it interferes/duplicates the methods below

\# setter
def shirt=(value)
  write\_attribute(:shirt\_fee\_in\_cents, value)
end

\# getter
def shirt
  if self\[:shirt\].present?
    return self\[:shirt\]
  end
  AverageHuman.default_shirt
end