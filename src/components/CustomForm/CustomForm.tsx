import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler } from "react-hook-form";
import {z} from "zod";
import InputForm from "./CustomInput";
const schema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("Correo invalido").min(1, "El correo es obligatorio"),
    password: z.string().min(6, "La contrseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(6, "La confirmacion debe tener al menos 6 caracteres")
}).refine( data => data.password === data.confirmPassword,{
    message:"Las contraseñas son invalidas",
    path:[ 'confirmPassword' ]
})
type FormValues = z.infer<typeof schema>;

const CustomForm = ()=>{
      const { control, handleSubmit, formState: {errors} } = useForm<FormValues>({
        resolver: zodResolver(schema)
      })
      const onSubmit: SubmitHandler<FormValues> = ( data ) => {
        console.log( data );
      }
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputForm name="name" control={control} label="name" type="text" error={errors.name}/>
            <InputForm name="email" control={control} label="email" type="email" error={errors.email}/>
            <InputForm name="password" control={control} label="password" type="password" error={errors.password}/>
            <InputForm name="confirmPassword" control={control} label="confirm Password" type="password" error={errors.confirmPassword}/>
            </form>
      )
    }
    export default CustomForm