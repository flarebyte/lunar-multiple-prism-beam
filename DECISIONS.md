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
