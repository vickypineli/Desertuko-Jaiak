// src/firebase/firestore.js
// src/firebase/firestore.js
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "./config"; // configuración de Firebase

/* =========================================
   🔧 Inicialización
   ========================================= */
const db = getFirestore(app);
const storage = getStorage(app); // usa el bucket definido en config.js

/* =========================================
   🔹 FUNCIONES GENERALES DE SUBIDA DE IMÁGENES
   ========================================= */

/**
 * Subir imagen a Firebase Storage en una carpeta específica.
 * @param {File} file - archivo a subir
 * @param {string} folder - carpeta destino (p.ej. "comercios", "productos")
 * @param {string} [fileName] - nombre opcional del archivo
 * @returns {Promise<string>} URL pública del archivo subido
 */
export const uploadImage = async (file, folder, fileName = null) => {
  try {
    const safeName = fileName || `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `${folder}/${safeName}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    console.log(`📤 Imagen subida correctamente a ${folder}:`, url);
    return url;
  } catch (error) {
    console.error("❌ Error al subir imagen:", error);
    throw error;
  }
};

/* =========================================
   🔹 FUNCIONES PARA COMERCIOS / COLABORADORES
   ========================================= */

/**
 * Obtener todos los comercios colaboradores
 */
export const getAllComercios = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "comercios"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("❌ Error al obtener los comercios:", error);
    return [];
  }
};

/**
 * Obtener un comercio por ID
 */
export const getComercioById = async (id) => {
  try {
    const docRef = doc(db, "comercios", id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (error) {
    console.error("❌ Error al obtener el comercio:", error);
    return null;
  }
};

/**
 * Añadir un nuevo comercio colaborador
 */
export const addComercio = async (comercio) => {
  try {
    // Subir logo si hay imagen
    let logoUrl = comercio.logoUrl || "";
    if (comercio.logoFile) {
      logoUrl = await uploadImage(comercio.logoFile, "comercios");
    }

    const docRef = await addDoc(collection(db, "comercios"), {
      name: comercio.name,
      description: comercio.description,
      logoUrl,
      phone: comercio.phone || "",
      email: comercio.email || "",
      address: comercio.address || "",
      category: comercio.category || "sin-categoría",
      social: comercio.social || {},
      createdAt: serverTimestamp(),
    });
    console.log("✅ Comercio agregado con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error al agregar comercio:", error);
    throw error;
  }
};

/**
 * Actualizar un comercio existente
 */
export const updateComercio = async (id, data) => {
  try {
    let logoUrl = data.logoUrl; // Mantiene el actual si no se cambia

    if (data.logoFile) {
      logoUrl = await uploadImage(data.logoFile, "comercios");
    }

    const docRef = doc(db, "comercios", id);
    // eslint-disable-next-line no-unused-vars
    const { logoFile, ...restData } = data; // Evita guardar el archivo en Firestore

    await updateDoc(docRef, {
      ...restData,
      logoUrl,
      updatedAt: serverTimestamp(),
    });

    console.log("✅ Comercio actualizado:", id);
  } catch (error) {
    console.error("❌ Error al actualizar comercio:", error);
    throw error;
  }
};

/**
 * Eliminar un comercio por ID
 */
export const deleteComercio = async (id) => {
  try {
    await deleteDoc(doc(db, "comercios", id));
    console.log("🗑️ Comercio eliminado:", id);
  } catch (error) {
    console.error("❌ Error al eliminar comercio:", error);
  }
};

/* =========================================
   🔹 FUNCIONES PARA PRODUCTOS / TIENDA
   ========================================= */

/**
 * Obtener todos los productos
 */
export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "productos"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    return [];
  }
};

/**
 * Añadir un nuevo producto
 */
export const addProduct = async (data) => {
  try {
    let imageUrl = data.imageUrl || "";
    if (data.imageFile) {
      imageUrl = await uploadImage(data.imageFile, "productos");
    }

    const docRef = await addDoc(collection(db, "productos"), {
      ...data,
      imageUrl,
      createdAt: serverTimestamp(),
    });

    console.log("✅ Producto agregado:", docRef.id);
    return { id: docRef.id, ...data, imageUrl };
  } catch (error) {
    console.error("❌ Error al agregar producto:", error);
    throw error;
  }
};

/**
 * Actualizar un producto
 */
export const updateProduct = async (id, data) => {
  try {
    let imageUrl = data.imageUrl || "";
    if (data.imageFile) {
      imageUrl = await uploadImage(data.imageFile, "productos");
    }

    const docRef = doc(db, "productos", id);
    await updateDoc(docRef, { ...data, imageUrl, updatedAt: serverTimestamp() });

    console.log("✅ Producto actualizado:", id);
    return { id, ...data, imageUrl };
  } catch (error) {
    console.error("❌ Error al actualizar producto:", error);
    throw error;
  }
};

/**
 * Eliminar un producto
 */
export const deleteProduct = async (id) => {
  try {
    await deleteDoc(doc(db, "productos", id));
    console.log("🗑️ Producto eliminado:", id);
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);
  }
};
/* =========================================
   🔹 FUNCIONES PARA EVENTOS Y ACTIVIDADES
   ========================================= */

/**
 * Obtener todos los eventos
 * (Ejemplo: Fiestas Desertu, Putxera Eguna, Navidades...)
 */
export const getAllEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "eventos"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("❌ Error al obtener eventos:", error);
    return [];
  }
};

/**
 * Obtener todas las actividades de todos los eventos
 */
export const getAllActivities = async () => {
  try {
    const eventsSnapshot = await getDocs(collection(db, "eventos"));
    const activities = [];

    for (const eventDoc of eventsSnapshot.docs) {
      const eventId = eventDoc.id;
      const eventData = eventDoc.data();

      const activitiesSnapshot = await getDocs(
        collection(db, `eventos/${eventId}/actividades`)
      );

      activitiesSnapshot.forEach((activityDoc) => {
        activities.push({
          id: activityDoc.id,
          eventId,
          eventName: eventData?.name || {},
          ...activityDoc.data(),
        });
      });
    }

    return activities;
  } catch (error) {
    console.error("❌ Error al obtener actividades:", error);
    return [];
  }
};

/**
 * Obtener todas las actividades de un evento concreto
 */
export const getActivitiesByEvent = async (eventId) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, `eventos/${eventId}/actividades`)
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      eventId,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(`❌ Error al obtener actividades del evento ${eventId}:`, error);
    return [];
  }
};

/**
 * Añadir una nueva actividad a un evento
 * @param {string} eventId - ID del evento
 * @param {object} activityData - Datos de la actividad
 */
export const addActivity = async (eventId, activityData) => {
  try {
    const docRef = await addDoc(
      collection(db, `eventos/${eventId}/actividades`),
      {
        ...activityData,
        createdAt: serverTimestamp(),
      }
    );
    console.log("✅ Actividad añadida:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error al añadir actividad:", error);
    throw error;
  }
};

/**
 * Actualizar una actividad existente
 * @param {string} eventId - ID del evento al que pertenece
 * @param {string} activityId - ID de la actividad
 * @param {object} data - Datos actualizados
 */
export const updateActivity = async (eventId, activityId, data) => {
  try {
    const docRef = doc(db, `eventos/${eventId}/actividades`, activityId);
    await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
    console.log("✅ Actividad actualizada:", activityId);
  } catch (error) {
    console.error("❌ Error al actualizar actividad:", error);
    throw error;
  }
};

/**
 * Eliminar una actividad
 * @param {string} eventId - ID del evento
 * @param {string} activityId - ID de la actividad
 */
export const deleteActivity = async (eventId, activityId) => {
  try {
    await deleteDoc(doc(db, `eventos/${eventId}/actividades`, activityId));
    console.log("🗑️ Actividad eliminada:", activityId);
  } catch (error) {
    console.error("❌ Error al eliminar actividad:", error);
    throw error;
  }
};

/**
 * Añadir, actualizar y eliminar eventos
 */
export const addEvent = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "eventos"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("❌ Error al crear evento:", error);
  }
};

export const updateEvent = async (id, data) => {
  try {
    const docRef = doc(db, "eventos", id);
    await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
  } catch (error) {
    console.error("❌ Error al actualizar evento:", error);
  }
};

export const deleteEvent = async (id) => {
  try {
    await deleteDoc(doc(db, "eventos", id));
  } catch (error) {
    console.error("❌ Error al eliminar evento:", error);
  }
};


