# Architecture decision records

An [architecture
decision](https://cloud.google.com/architecture/architecture-decision-records)
is a software design choice that evaluates:

-   a functional requirement (features).
-   a non-functional requirement (technologies, methodologies, libraries).

The purpose is to understand the reasons behind the current architecture, so
they can be carried-on or re-visited in the future.

## Image hero prompt

> A manga-style drawing of a lunar landscape with multiple prisms
> arranged in a circle, reflecting a beam of light that forms the logo of
> “lunar-multiple-prism-beam” in the sky, while an astronaut watches in
> awe.

## Possible features

### Schema versioning

Managing schema versioning natively for a document store has some pros and
cons, depending on our use case and requirements.

Pros:

-   We can avoid downtime or schema migration by using the document store's
    flexible schema model, which allows different versions of the same
    document to coexist in the same collection.
-   We can easily track and handle schema changes by adding a version
    number to each document, and using conditional logic in our application
    code to deal with different versions.
-   We can update our documents to the latest schema version gradually, on
    demand, or not at all, depending on our needs.

Cons:

-   We may need to write more complex application code to handle multiple
    schema versions, and create dedicated functions for each version.
-   We may need to store redundant or unused data in some documents,
    depending on the schema changes.
-   We may need to perform additional queries or joins to access related
    data across different schema versions.

There are different ways to represent a version for a model, depending on the
type and purpose of the model. Some possible ways are:

-   Using a **version number** or a **version string** that indicates the
    iteration or revision of the model. For example, we can use a semantic
    versioning scheme that consists of three numbers: major, minor, and
    patch (e.g., 1.2.3). The major number indicates a breaking change, the
    minor number indicates a new feature, and the patch number indicates a
    bug fix.
-   Using a **version identifier** or a **version tag** that uniquely
    identifies the model or a snapshot of the model at a certain point in
    time. This is often used in conjunction with version control systems,
    such as Git, that allow we to track and manage changes to our model
    over time. For example, we can use a hash code (e.g., 4a0c8ee) or a
    human-readable name (e.g., v1.0) to label our model versions and refer
    to them later.
-   Using the hash of the document model as a version identifier. We could
    use the hash to verify the integrity and authenticity of the model, by
    comparing it with the expected value.
-   Using fine grained versioning to represent different versions for
    different parts of the document. We can track and manage changes to
    specific parts of the document, without affecting the whole document or
    other parts that are unchanged. We can use the fine grained versioning
    to support features such as branching, merging, diffing, and patching
    of parts of the document.

## A more restrictive graphQL

GraphQL is a query language and a runtime for APIs that allows clients to
specify the data they need. However, GraphQL also introduces some security
risks that need to be addressed. Here are some reasons why GraphQL can be too
permissive and flexible on the client side and raise security issues:

-   **Denial-of-Service-Oriented Attacks**: GraphQL allows clients to write
    complex and nested queries that can consume a lot of resources on the
    server side. This can lead to performance degradation or even
    denial-of-service attacks if not properly controlled. Some techniques
    to mitigate this include limiting query depth, paginating list fields,
    setting timeouts, and using query cost analysis.
-   **Lack of Object-Level Authorization**: GraphQL does not have a
    built-in mechanism for object-level authorization, which means that it
    does not check whether a user has permission to access a specific
    object or field. This can result in data leakage or unauthorized
    modifications if not implemented correctly by the developers. Some
    techniques to implement object-level authorization include using
    directives, middleware, or custom resolvers.
-   **Cross-Site Request Forgery (CSRF)**: GraphQL APIs are vulnerable to
    CSRF attacks if they do not use proper authentication methods or
    tokens. CSRF attacks occur when a malicious website tricks a user into
    sending a request to another website where they are already logged in,
    without their consent. This can result in unwanted actions or data
    exposure on the target website. Some techniques to prevent CSRF attacks
    include using HTTP headers, cookies, or tokens.
-   **Introspection**: GraphQL provides built-in documentation that tells
    developers what the fields are, providing a schema of everything you
    can query. This can expose sensitive information or internal details to
    malicious actors who can use it to craft malicious queries or exploit
    vulnerabilities.
-   **Field Suggestions**: Another usability benefit in GraphQL could also
    be a potential security concern—field suggestions. These are hints that
    help developers write queries by suggesting possible fields or
    arguments. However, this can also leak information about the schema or
    the data to unauthorized users.
