import { Router } from "../../deps.ts";
import { API_URL } from "../../config.ts";
import * as ThingsController from "./things_controllers.ts";

const router = new Router();
const ENDPOINT_URL = `${API_URL}/things`;

router.prefix(ENDPOINT_URL);

// Get all Things
router.get("/", ThingsController.allThings);

// Get Thing by ID
router.get(
  "/:id",
  ThingsController.uniqueThing,
);

// Create Thing
router.post(
  "/",
  ThingsController.createThing,
);

// Update Thing
router.patch(
  "/:id",
  ThingsController.updateThing,
);

// // Delete Thing
router.delete(
  "/:id",
  ThingsController.deleteThing,
);

export { router as ThingsRouter };
