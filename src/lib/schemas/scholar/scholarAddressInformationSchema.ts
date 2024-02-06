import { z } from 'zod';

const scholarAddressInformationSchema = z
    .object({
        state: z.string().min(1, { message: 'Debes especificar el estado de origen' }).trim(),
        address: z.string().min(1, { message: 'Debes especificar la direccion' }).trim(),
        // city: z.string().email({ message: 'Debes especificar la ciudad' }).trim(),
    });

export default scholarAddressInformationSchema;
