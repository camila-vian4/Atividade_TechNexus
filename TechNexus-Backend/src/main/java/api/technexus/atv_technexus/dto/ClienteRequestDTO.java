package api.technexus.atv_technexus.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ClienteRequestDTO {
    @NotBlank(message = "O nome não pode estar vazio.")
    @Size(min = 2, message = "O nome deve ter no mínimo 2 caracteres.")
    @Size(max = 100, message = "O nome deve ter no máximo 100 caracteres.")
    private String nome;

    @Email(message = "O e-mail deve ser válido.")
    @NotBlank(message = "O e-mail é obrigatório.")
    private String email;

    @NotBlank(message = "O número telefônico é obrigatório.")
    @Size(min = 9, message = "O telefone deve ter no mínimo 9 caracteres.")
    @Size(max = 13, message = "O telefone deve ter no máximo 13 caracteres.")
    private String telefone;

    @NotBlank(message = "O CPF é obrigatório.")
    @Size(min = 11, message = "O CPF deve ter no mínimo 11 caracteres.")
    @Size(max = 14, message = "O CPF deve ter no máximo 14 caracteres.")
    private String cpf;

    public ClienteRequestDTO() {
    }

    public ClienteRequestDTO(String nome, String email, String telefone, String cpf) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.cpf = cpf;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }
}
