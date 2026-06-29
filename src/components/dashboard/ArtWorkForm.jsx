"use client";

import { Pencil, Picture, CircleDollar } from "@gravity-ui/icons";
import { Button, Input, TextArea } from "@heroui/react";

const categories = [
  "Painting",
  "Digital Art",
  "Photography",
  "Sculpture",
  "Abstract",
  "Portrait",
  "Landscape",
  "Illustration",
];

export default function ArtworkForm({
  defaultValues = {},
  loading = false,
  submitText = "Add Artwork",
  onSubmit,
}) {
  // Check if we are in edit mode by seeing if initial data (like a title) was provided
  const isEditMode = !!defaultValues.title;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <form
        onSubmit={onSubmit}
        className="space-y-8 rounded-3xl border border-default-200 bg-background p-8 shadow-2xl shadow-fuchsia-500/5"
      >
        <div className="border-b border-default-200 pb-6">
          <h2 className="text-2xl font-black text-foreground">
            {isEditMode ? "Edit Artwork Details" : "Artwork Information"}
          </h2>

          <p className="mt-2 text-sm text-default-500">
            {isEditMode
              ? "Modify the fields below to update your existing artwork listing."
              : "Fill in the details below to publish your artwork."}
          </p>
        </div>

        {/* Core Info Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Artwork Image Wrapper */}
          <div className="space-y-5 rounded-2xl border-2 border-dashed border-default-300 p-8 text-center transition hover:border-fuchsia-400">
            <Picture className="mx-auto mb-3 h-10 w-10 text-fuchsia-500" />

            <p className="font-semibold">
              {isEditMode ? "Change Artwork Image" : "Upload Artwork"}
            </p>

            <p className="text-sm text-default-500">
              Upload an image or paste an image URL
            </p>

            {isEditMode && (
              <p className="mt-1 text-xs font-medium text-amber-500">
                Leave both fields empty to keep the current image.
              </p>
            )}

            {/* Upload Image */}
            <Input
              type="file"
              name="image"
              accept="image/*"
              required={!isEditMode}
              className="mt-2"
              label="Upload Image"
              variant="bordered"
            />

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-default-200"></div>
              <span className="text-xs text-default-400">OR</span>
              <div className="h-px flex-1 bg-default-200"></div>
            </div>

            {/* Image URL */}
            <Input
              type="url"
              name="imageUrl"
              label="Image URL"
              placeholder="https://images.unsplash.com/..."
              variant="bordered"
            />
          </div>

          <div className="flex flex-col justify-center">
            {/* Artwork Title */}
            <Input
              name="title"
              label="Artwork Title"
              placeholder="Enter artwork title"
              variant="bordered"
              defaultValue={defaultValues.title}
              startcontent={<Pencil className="h-4 w-4 text-default-400" />}
              required
              className="w-full"
            />
          </div>
        </div>

        {/* Full Width Description Area */}
        <div className="w-full">
          <TextArea
            name="description"
            label="Description"
            placeholder="Write a short description..."
            variant="bordered"
            defaultValue={defaultValues.description}
            minrows={6}
            required
          />
        </div>

        {/* Bottom Metadata Info Split */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Price */}
          <Input
            name="price"
            type="number"
            label="Price ($)"
            placeholder="Enter price"
            variant="bordered"
            defaultValue={defaultValues.price}
            startcontent={<CircleDollar className="h-4 w-4 text-default-400" />}
            required
          />

          {/* Category */}
          <div className="flex flex-col justify-end">
            <label className="mb-2 block text-sm font-medium text-default-600">
              Category
            </label>

            <select
              name="category"
              defaultValue={defaultValues.category || ""}
              className="h-12 w-full rounded-xl border border-default-200 bg-background px-3 text-sm outline-none transition focus:border-fuchsia-500"
              required
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button
          type="submit"
          isLoading={loading}
          className="h-14 w-full rounded-2xl bg-linear-to-r from-fuchsia-500 via-pink-500 to-cyan-400 text-lg font-black text-white shadow-xl shadow-fuchsia-500/20 cursor-pointer"
        >
          {submitText}
        </Button>
      </form>
    </div>
  );
}
