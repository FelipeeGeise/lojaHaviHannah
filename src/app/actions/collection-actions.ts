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

/* CREATE */

export async function createCollection(
  formData: FormData
): Promise<void> {
  const file = formData.get("image");

  if (!(file instanceof File)) {
    throw new Error("Imagem inválida.");
  }

  const title = String(
    formData.get("title") || ""
  );

  const description = String(
    formData.get("description") || ""
  );

  const bytes = await file.arrayBuffer();

  const buffer = Buffer.from(bytes);

  const uploadResult =
    await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "collections",
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
                    "Erro upload."
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

  const slug = slugify(title, {
    lower: true,
    strict: true,
    locale: "pt",
  });

  await prisma.collection.create({
    data: {
      title,
      slug,
      description,
      imageUrl:
        uploadResult.secure_url,
    },
  });
}

/* DELETE */

export async function deleteCollection(
  id: string
): Promise<void> {
  await prisma.collection.delete({
    where: {
      id,
    },
  });
}