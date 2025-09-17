import z from "zod";

const ACCEPTED_FILE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/zip',
    'application/x-zip-compressed',
    'application/x-rar-compressed',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.zip', '.rar', '.pdf', '.docx', '.xls', '.xlsx'];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB em bytes

const getFileExtension = (fileName: string): string => {
    return fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
};

// Schema para validação de um arquivo individual
const fileSchema = z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: `Arquivo muito grande. Tamanho máximo: ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    })
    .refine((file) => {
        // Verifica tipo MIME primeiro
        if (ACCEPTED_FILE_TYPES.includes(file.type)) {
            return true;
        }
        // Se tipo MIME não for reconhecido, verifica extensão
        const extension = getFileExtension(file.name);
        return ACCEPTED_EXTENSIONS.includes(extension);
    }, {
        message: 'Formato de arquivo não suportado. Formatos aceitos: .jpg, .png, .zip, .rar, .pdf, .docx, .xls, .xlsx',
    });

export const ticketActionValidation = z.object({
    idChamado: z.uuid()
        .nonoptional(),

    idUsuario: z.uuid()
        .nonoptional(),

    descricaoAcao: z.string()
        .max(2500, "A ação não pode ultrapassar 2500 caracteres!")
        .nonempty("A ação não pode ser vazia!")
        .nonoptional("A ação é obrigatória!"),

    publica: z.boolean()
        .default(true)
        .nonoptional("A ação deve ser pública ou interna!"),

    arquivos: z
        .array(fileSchema)
        .max(10, 'Máximo de 10 arquivos permitidos')
        .optional()
})