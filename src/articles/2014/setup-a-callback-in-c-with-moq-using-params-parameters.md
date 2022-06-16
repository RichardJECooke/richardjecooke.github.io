---
layout: layout_post.html
title: 'Setup a callback in C# with Moq using params parameters'
tags: ['post', 'c#', 'moq', 'testing']
date: 2014-05-06 20:00:46
---

This post explains how to use Moq to get an object from a mocked class where the called method has a _params_ parameter. Here's the example code we are going to test:

```csharp
public class IPersonLogic
{
    GetNumberOfPeople(params Person[] args);
}

public class MainProgram
{
    public int Go(Person person)
    {
        return GetNumberOfPeople(person, new Person("Jessica"));
    }
}
```

If you want to keep a record of the name passed to IPersonLogic in the test you need to do it like this:

```csharp
[TestFixture]
public class PersonLogicTest
{
    [Test]
    public void Go_Test()
    {
        Person testPerson;
        var mock = new Mock<IPersonLogic>();
        mock.Setup(x => x.GetNumberOfPeople(It.IsAny<Person>(), It.IsAny<Person>())).Callback
        (
            (Person p1, Person p2) => { testPerson = p1; }
        );
        Repository.Add(mock);
        new MainProgram().Go(new Person("Paul));
    }
}
```

If you put a breakpoint on line 15 you'll see that testPerson is now Paul. Note that the code below does NOT work (and is how most people first try to do this):

```csharp
mock.Setup(x => x.GetNumberOfPeople(It.IsAny<Person>(), It.IsAny<Person>())).Callback
(
    (Person[] args) => { testPerson = args[0]; }
);
```
