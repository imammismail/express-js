const { z } = require("zod");

exports.CreateEvent = z.object({
    event_type: z.string(),
    image_path: z.string(),
    event_name: z.string(),
    event_start_date: z.number(),
    event_end_date: z.number(),
    event_format: z.string(),
    event_location: z.number(),
    event_locatoin_detail: z.string(),
    event_description: z.string(),
    event_customer_fullname: z.boolean(),
    event_customer_email: z.boolean(),
    event_customer_phone: z.boolean(),
    event_customer_id_number: z.boolean(),
    event_customer_dob: z.boolean(),
    event_customer_gender: z.boolean(),
    event_seat: z.string(),
    event_tiket_per_transaction: z.number(),
    event_customer_email_uniq: z.boolean(),
    event_customer_data_uniq: z.boolean(),
});
