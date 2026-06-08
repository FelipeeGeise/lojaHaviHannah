"use server";

import { prisma } from "../lib/prisma";

import cloudinary from "../lib/cloudinary";

import slugify from "slugify";

import type {
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";

interface CloudinaryUploadResult {
  secure_url: string;
}

export async function createProduct(
  formData: FormData
): Promise<void> {
  const file = formData.get("image");

  if (!(file instanceof File)) {
    throw new Error(
      "Imagem inválida."
    );
  }

  const title = String(
    formData.get("title") || ""
  );

  const author = String(
    formData.get("author") || ""
  );

  const category = String(
    formData.get("category") || ""
  );

  const description = String(
    formData.get("description") || ""
  );

  const publisher = String(
    formData.get("publisher") || ""
  );

  const isbn = String(
    formData.get("isbn") || ""
  );

  const price = Number(
    formData.get("price") || 0
  );

  const oldPrice = Number(
    formData.get("oldPrice") || 0
  );

  const pages = Number(
    formData.get("pages") || 0
  );

  if (!title.trim()) {
    throw new Error(
      "Título obrigatório."
    );
  }

  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  const uploadResult =
    await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "havihannah",
            },

            (
              error:
                | UploadApiErrorResponse
                | undefined,

              result:
                | UploadApiResponse
                | undefined
            ) => {
              if (error) {
                reject(error);

                return;
              }

              if (!result) {
                reject(
                  new Error(
                    "Falha no upload da imagem."
                  )
                );

                return;
              }

              resolve({
                secure_url:
                  result.secure_url,
              });
            }
          )
          .end(buffer);
      }
    );

  const slug = `${slugify(title, {
    lower: true,
    strict: true,
    locale: "pt",
  })}-${Date.now()}`;

  await prisma.product.create({
    data: {
      title,
      slug,

      author,
      category,

      description,

      publisher,

      isbn,

      pages,

      price,

      oldPrice:
        oldPrice > 0
          ? oldPrice
          : null,

      imageUrl:
        uploadResult.secure_url,
    },
  });
}