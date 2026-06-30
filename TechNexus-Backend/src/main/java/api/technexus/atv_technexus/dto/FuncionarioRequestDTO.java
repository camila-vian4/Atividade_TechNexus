package api.technexus.atv_technexus.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class FuncionarioRequestDTO {

    @NotBlank(message = "O nome é obrigatório.")
    @Size(max = 200, message = "O nome deve ter no máximo 200.")
    private String nome;

    @NotBlank(message = "O número telefônico é obrigatório.")
    @Size(min = 9, message = "O telefone deve ter no mínimo 9 caracteres.")
    @Size(max = 13, message = "O telefone deve ter no máximo 13 caracteres.")
    private String telefone;

    @Email(message = "O e-mail deve ser válido.")
    @NotBlank(message = "O e-mail é obrigatório.")
    private String email;

    @NotBlank(message = "O cargo é obrigatório.")
    private String cargo;

    @NotBlank(message = "O setor é obrigatório.")
    private String setor;

    public FuncionarioRequestDTO() {
    }

    public FuncionarioRequestDTO(String nome, String telefone, String email, String cargo, String setor) {
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.cargo = cargo;
        this.setor = setor;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getSetor() {
        return setor;
    }

    public void setSetor(String setor) {
        this.setor = setor;
    }
}
